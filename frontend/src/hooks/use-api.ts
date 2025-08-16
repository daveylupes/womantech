import { useAccount } from 'wagmi';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiService, UserRegistration, User } from '@/lib/api';
import { toast } from 'sonner';

// Hook to register a new user via API
export function useApiRegister() {
  const queryClient = useQueryClient();
  const { address } = useAccount();

  const mutation = useMutation({
    mutationFn: (userData: Omit<UserRegistration, 'wallet_address'>) => {
      if (!address) {
        throw new Error('Wallet not connected');
      }
      
      return apiService.registerUser({
        ...userData,
        wallet_address: address,
      });
    },
    onSuccess: (data) => {
      toast.success('Registration successful!');
      // Invalidate and refetch user data
      queryClient.invalidateQueries({ queryKey: ['api-user', address] });
      queryClient.invalidateQueries({ queryKey: ['api-users'] });
    },
    onError: (error: Error) => {
      toast.error(`Registration failed: ${error.message}`);
      console.error('Registration error:', error);
    },
  });

  const register = async (name: string, role: 'MENTOR' | 'MENTEE' | 'ADMIN', email?: string) => {
    if (!address) {
      toast.error('Please connect your wallet first');
      return;
    }

    if (!name.trim()) {
      toast.error('Name is required');
      return;
    }

    mutation.mutate({
      name: name.trim(),
      role,
      email,
    });
  };

  return {
    register,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
  };
}

// Hook to get current user via API
export function useApiCurrentUser() {
  const { address, isConnected } = useAccount();
  
  console.log('Hook: useApiCurrentUser - address:', address, 'isConnected:', isConnected);
  
  const { data: user, isLoading, error, refetch } = useQuery({
    queryKey: ['api-user', address],
    queryFn: () => apiService.getUserByAddress(address!),
    enabled: isConnected && !!address,
    retry: 1,
  });

  console.log('Hook: useApiCurrentUser - user data:', user, 'isLoading:', isLoading, 'error:', error);

  return {
    user,
    isLoading,
    error,
    refetch,
    isConnected,
    address,
  };
}

// Hook to search users via API
export function useApiUsers(params: {
  role?: 'MENTOR' | 'MENTEE' | 'ADMIN';
  skills?: string;
  limit?: number;
} = {}) {
  const { data: users, isLoading, error } = useQuery({
    queryKey: ['api-users', params],
    queryFn: () => apiService.searchUsers(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    users,
    isLoading,
    error,
  };
}

// Hook to get user by address via API
export function useApiUserByAddress(userAddress: string | undefined) {
  const { data: user, isLoading, error } = useQuery({
    queryKey: ['api-user', userAddress],
    queryFn: () => apiService.getUserByAddress(userAddress!),
    enabled: !!userAddress,
  });

  return {
    user,
    isLoading,
    error,
  };
}

// Hook to check if user is registered via API
export function useApiIsRegistered() {
  const { user, isLoading } = useApiCurrentUser();
  
  return {
    isRegistered: !!user,
    isLoading,
    user,
  };
}
