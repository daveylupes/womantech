import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { useAccount, useChainId } from 'wagmi';
import { WOMANTECH_CONTRACT_ADDRESS } from '@/lib/contract';

export function ContractStatus() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  
  const isBlockDAG = chainId === 1043;
  const isContractDeployed = WOMANTECH_CONTRACT_ADDRESS !== "0x0000000000000000000000000000000000000000";

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Contract Status
        </CardTitle>
        <CardDescription>
          Blockchain connection and contract deployment status
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Wallet Connection */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Wallet Connection</p>
            <p className="text-sm text-muted-foreground">
              {isConnected ? 'Connected' : 'Not connected'}
            </p>
          </div>
          <Badge variant={isConnected ? 'default' : 'secondary'}>
            {isConnected ? (
              <CheckCircle className="h-3 w-3 mr-1" />
            ) : (
              <AlertCircle className="h-3 w-3 mr-1" />
            )}
            {isConnected ? 'Connected' : 'Disconnected'}
          </Badge>
        </div>

        {/* Network */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Network</p>
            <p className="text-sm text-muted-foreground">
              {isBlockDAG ? 'BlockDAG Primordial Testnet' : 'Wrong Network'}
            </p>
          </div>
          <Badge variant={isBlockDAG ? 'default' : 'destructive'}>
            {isBlockDAG ? (
              <CheckCircle className="h-3 w-3 mr-1" />
            ) : (
              <AlertCircle className="h-3 w-3 mr-1" />
            )}
            {isBlockDAG ? 'BlockDAG' : 'Wrong Network'}
          </Badge>
        </div>

        {/* Contract Deployment */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Contract Deployment</p>
            <p className="text-sm text-muted-foreground">
              {isContractDeployed ? 'Deployed' : 'Not deployed'}
            </p>
          </div>
          <Badge variant={isContractDeployed ? 'default' : 'secondary'}>
            {isContractDeployed ? (
              <CheckCircle className="h-3 w-3 mr-1" />
            ) : (
              <AlertCircle className="h-3 w-3 mr-1" />
            )}
            {isContractDeployed ? 'Deployed' : 'Not Deployed'}
          </Badge>
        </div>

        {/* Contract Address */}
        {isContractDeployed && (
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Contract Address</p>
              <p className="text-sm text-muted-foreground font-mono">
                {WOMANTECH_CONTRACT_ADDRESS.slice(0, 6)}...{WOMANTECH_CONTRACT_ADDRESS.slice(-4)}
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const explorerUrl = `https://primordial.bdagscan.com/address/${WOMANTECH_CONTRACT_ADDRESS}`;
                window.open(explorerUrl, '_blank');
              }}
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              View
            </Button>
          </div>
        )}

        {/* Wallet Address */}
        {isConnected && address && (
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Your Address</p>
              <p className="text-sm text-muted-foreground font-mono">
                {address.slice(0, 6)}...{address.slice(-4)}
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const explorerUrl = `https://primordial.bdagscan.com/address/${address}`;
                window.open(explorerUrl, '_blank');
              }}
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              View
            </Button>
          </div>
        )}

        {/* Status Summary */}
        <div className="pt-4 border-t">
          <div className="flex items-center gap-2">
            {isConnected && isBlockDAG && isContractDeployed ? (
              <>
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium text-green-700">
                  Ready to use WomanTech Connect
                </span>
              </>
            ) : (
              <>
                <AlertCircle className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-medium text-yellow-700">
                  Setup required
                </span>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
