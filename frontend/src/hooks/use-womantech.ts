import { useAccount, useContractRead, useContractWrite, useWaitForTransactionReceipt } from 'wagmi';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { contractConfig, Role, User } from '@/lib/contract';
import { toast } from 'sonner';

// Hook to get current user data
export function useCurrentUser() {
  const { address, isConnected } = useAccount();
  
  const { data: user, isLoading, error, refetch } = useContractRead({
    ...contractConfig,
    functionName: 'getUser',
    args: address ? [address] : undefined,
    enabled: isConnected && !!address,
  });

  return {
    user: user as User | undefined,
    isLoading,
    error,
    refetch,
    isConnected,
    address,
  };
}

// Hook to get all users with pagination
export function useUsers(offset: number = 0, limit: number = 10) {
  const { data: users, isLoading, error } = useContractRead({
    ...contractConfig,
    functionName: 'getUsers',
    args: [BigInt(offset), BigInt(limit)],
  });

  return {
    users: users as User[] | undefined,
    isLoading,
    error,
  };
}

// Hook to get total user count
export function useTotalUsers() {
  const { data: total, isLoading, error } = useContractRead({
    ...contractConfig,
    functionName: 'totalUsers',
  });

  return {
    total: total as bigint | undefined,
    isLoading,
    error,
  };
}

// Hook to register a new user
export function useRegister() {
  const queryClient = useQueryClient();
  const { address } = useAccount();

  const { data: hash, write, isPending, error } = useContractWrite({
    ...contractConfig,
    functionName: 'register',
  });

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const register = async (name: string, role: Role) => {
    if (!address) {
      toast.error('Please connect your wallet first');
      return;
    }

    if (!name.trim()) {
      toast.error('Name is required');
      return;
    }

    try {
      write({
        args: [name, role],
      });
      toast.info('Registration transaction submitted...');
    } catch (err) {
      toast.error('Failed to submit registration');
      console.error('Registration error:', err);
    }
  };

  // Handle transaction success
  if (isSuccess) {
    toast.success('Registration successful!');
    // Invalidate and refetch user data
    queryClient.invalidateQueries({ queryKey: ['user', address] });
    queryClient.invalidateQueries({ queryKey: ['users'] });
    queryClient.invalidateQueries({ queryKey: ['totalUsers'] });
  }

  // Handle transaction error
  if (error) {
    toast.error(`Registration failed: ${error.message}`);
  }

  return {
    register,
    isPending: isPending || isConfirming,
    isSuccess,
    error,
  };
}

// Hook to confirm mentorship
export function useConfirmMentorship() {
  const queryClient = useQueryClient();
  const { address } = useAccount();

  const { data: hash, write, isPending, error } = useContractWrite({
    ...contractConfig,
    functionName: 'confirmMentorship',
  });

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const confirmMentorship = async (menteeAddress: string) => {
    if (!address) {
      toast.error('Please connect your wallet first');
      return;
    }

    if (!menteeAddress) {
      toast.error('Mentee address is required');
      return;
    }

    try {
      write({
        args: [menteeAddress as `0x${string}`],
      });
      toast.info('Mentorship confirmation submitted...');
    } catch (err) {
      toast.error('Failed to confirm mentorship');
      console.error('Mentorship confirmation error:', err);
    }
  };

  // Handle transaction success
  if (isSuccess) {
    toast.success('Mentorship confirmed! Reputation updated.');
    // Invalidate and refetch user data
    queryClient.invalidateQueries({ queryKey: ['user', address] });
    queryClient.invalidateQueries({ queryKey: ['users'] });
  }

  // Handle transaction error
  if (error) {
    toast.error(`Mentorship confirmation failed: ${error.message}`);
  }

  return {
    confirmMentorship,
    isPending: isPending || isConfirming,
    isSuccess,
    error,
  };
}

// Hook to check if user is registered
export function useIsRegistered() {
  const { user, isLoading } = useCurrentUser();
  
  return {
    isRegistered: user?.registered || false,
    isLoading,
    user,
  };
}

// Hook to get user by address
export function useUserByAddress(userAddress: string | undefined) {
  const { data: user, isLoading, error } = useContractRead({
    ...contractConfig,
    functionName: 'getUser',
    args: userAddress ? [userAddress as `0x${string}`] : undefined,
    enabled: !!userAddress,
  });

  return {
    user: user as User | undefined,
    isLoading,
    error,
  };
}
