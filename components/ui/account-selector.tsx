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
        const selectedAccount = accounts.find(acc => acc.id === value);
        if (selectedAccount) {
          onAccountSelect(selectedAccount);
        }
      }}>
        <SelectTrigger>
          <SelectValue placeholder="Select an account" />
        </SelectTrigger>
        <SelectContent>
          {accounts.map((account) => (
            <SelectItem key={account.id} value={account.id}>
              {account.name} - {account.accountId}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
} 