import { useState, useEffect } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Account {
  id: string;
  name: string;
  accountId: string;
  customerPOC: string;
  status: string;
  effortLevel: string;
  type: string;
  numberOfClients: number;
}

interface AccountSelectorProps {
  onAccountSelect: (account: Account) => void;
}

export function AccountSelector({ onAccountSelect }: AccountSelectorProps) {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await fetch('/api/monday/accounts');
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch accounts');
        }

        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error('Invalid response format');
        }
        setAccounts(data);
      } catch (err) {
        console.error('Error fetching accounts:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch accounts');
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  if (loading) return <div className="text-center py-4">Loading accounts...</div>;
  if (error) return <div className="text-red-500 py-4">Error: {error}</div>;
  if (accounts.length === 0) return <div className="text-gray-500 py-4">No accounts found</div>;

  return (
    <div className="w-full max-w-md">
      <Select onValueChange={(value) => {
        const account = accounts.find(acc => acc.accountId === value);
        if (account) {
          setSelectedAccount(account);
          onAccountSelect(account);
        }
      }}>
        <SelectTrigger className="w-full min-w-[300px]">
          <SelectValue placeholder="Select an account">
            {selectedAccount && (
              <div className="flex flex-col items-start">
                <div className="font-medium">
                  {selectedAccount.name} - {selectedAccount.accountId || 'N/A'}
                </div>
              </div>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {accounts
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((account) => (
              <SelectItem 
                key={account.accountId} 
                value={account.accountId}
                className="flex flex-col items-start py-2"
              >
                <div className="font-medium">
                  {account.name} - {account.accountId || 'N/A'}
                </div>
              </SelectItem>
            ))
          }
        </SelectContent>
      </Select>
    </div>
  );
} 