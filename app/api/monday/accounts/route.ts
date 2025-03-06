import { NextResponse } from 'next/server';

const MONDAY_API_ENDPOINT = 'https://api.monday.com/v2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Content-Type': 'application/json'
};

interface ColumnValue {
  id: string;
  text: string;
  value: string;
}

interface Item {
  id: string;
  name: string;
  column_values: ColumnValue[];
}

interface Group {
  id: string;
  title: string;
}

interface Column {
  id: string;
  title: string;
  type: string;
}

interface Board {
  name: string;
  columns: Column[];
  groups: Group[];
  items: Item[];
}

interface MondayColumnValue {
  id: string;
  text: string;
  value: string;
  title: string;
}

interface MondayItem {
  id: string;
  name: string;
  column_values: MondayColumnValue[];
}

interface MondayItemsPage {
  items: MondayItem[];
}

interface MondayGroup {
  id: string;
  title: string;
  items_page: MondayItemsPage;
}

interface MondayWorkspace {
  id: string;
  name: string;
}

interface MondayBoard {
  id: string;
  name: string;
  columns: MondayColumn[];
  groups: MondayGroup[];
  workspace: MondayWorkspace;
}

interface MondayColumn {
  id: string;
  title: string;
  type: string;
}

interface MondayUser {
  name: string;
}

interface MondayError {
  message: string;
}

interface MondayAPIResponse {
  data: {
    me: MondayUser;
    boards: MondayBoard[];
  };
  errors?: MondayError[];
}

export async function GET(request: Request) {
  try {
    // Token validation
    const token = process.env.MONDAY_API_TOKEN;
    console.log('Token check:', {
      exists: !!token,
      length: token?.length,
      firstChars: token?.substring(0, 10) + '...',
      lastChars: '...' + token?.substring(token.length - 10)
    });

    if (!token) {
      throw new Error('MONDAY_API_TOKEN is not configured in environment variables');
    }

    // Start with a simple query to test authentication
    const query = `
      query {
        me {
          name
        }
        boards(ids: 8247982294) {
          id
          name
          workspace {
            id
            name
          }
        }
      }
    `;

    console.log('Making request to Monday.com API with simple query...');

    const response = await fetch(MONDAY_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify({ query })
    });

    const responseText = await response.text();
    console.log('Monday.com API Response:', {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
      body: responseText
    });

    if (!response.ok) {
      throw new Error(`Monday.com API error: ${response.status} ${response.statusText} - ${responseText}`);
    }

    let data;
    try {
      data = JSON.parse(responseText);
      console.log('Parsed API Response:', JSON.stringify(data, null, 2));
    } catch (e) {
      console.error('Failed to parse response as JSON:', e);
      throw new Error(`Invalid JSON response: ${responseText}`);
    }

    if (data.errors) {
      console.error('Monday.com API returned errors:', data.errors);
      throw new Error(data.errors.map((e: MondayError) => e.message).join(', '));
    }

    if (!data.data?.boards?.length) {
      throw new Error('Board not found with ID 8247982294');
    }

    // Log user and board information
    console.log('Authenticated User:', data.data.me);
    console.log('Available Boards:', data.data.boards.map((b: MondayBoard) => ({
      id: b.id,
      name: b.name,
      workspace: b.workspace
    })));

    // If we get here, authentication works. Now get the full data
    const fullQuery = `
      query {
        boards(ids: 8247982294) {
          id
          name
          columns {
            id
            title
            type
          }
          groups {
            id
            title
            items_page {
              items {
                id
                name
                column_values {
                  id
                  text
                  value
                }
              }
            }
          }
        }
      }
    `;

    const fullResponse = await fetch(MONDAY_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify({ query: fullQuery })
    });

    const fullData = await fullResponse.json();

    if (!fullResponse.ok || fullData.errors) {
      console.error('Error fetching board data:', fullData.errors || fullResponse.statusText);
      throw new Error(`Failed to fetch board data: ${JSON.stringify(fullData.errors || fullResponse.statusText)}`);
    }

    if (!fullData.data?.boards?.length) {
      throw new Error('Board not found with ID 8247982294');
    }

    const board = fullData.data.boards[0];
    if (!board.groups?.length) {
      console.log('Board found but has no groups:', board);
      return NextResponse.json([], { headers: corsHeaders });
    }

    // Create a map of column IDs to their titles
    const columnMap = board.columns.reduce((acc: Record<string, string>, col: MondayColumn) => {
      acc[col.id] = col.title.toLowerCase().replace(/\s+/g, '');
      return acc;
    }, {});

    console.log('Column mapping:', columnMap);

    // Transform the data into the format expected by the frontend
    const accounts = board.groups
      .flatMap((group: MondayGroup) => {
        const items = group.items_page?.items || [];
        return items.map((item: MondayItem) => {
          const columnValues = item.column_values.reduce((acc: Record<string, string>, col: MondayColumnValue) => {
            const columnKey = columnMap[col.id] || col.id;
            acc[columnKey] = col.text || '';
            return acc;
          }, {});

          console.log('Processing item:', {
            id: item.id,
            name: item.name,
            columnValues
          });

          return {
            id: item.id,
            name: item.name,
            accountId: columnValues.accountid || '',
            customerPOC: columnValues.customerpoc || '',
            status: columnValues.status || '',
            effortLevel: columnValues.effortlevel || '',
            type: columnValues.type || '',
            numberOfClients: parseInt(columnValues.numberofclients || '0', 10)
          };
        });
      });

    return NextResponse.json(accounts, { headers: corsHeaders });
  } catch (error: any) {
    console.error('Error in Monday.com API route:', {
      message: error.message,
      stack: error.stack
    });
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function OPTIONS(request: Request) {
  return new NextResponse(null, { headers: corsHeaders });
} 