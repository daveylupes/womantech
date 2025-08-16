import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useApiRegister } from '@/hooks/use-api';
import { Loader2, UserPlus } from 'lucide-react';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RegistrationModal({ isOpen, onClose }: RegistrationModalProps) {
  const [name, setName] = useState('');
  const [role, setRole] = useState<'MENTOR' | 'MENTEE'>('MENTOR');
  const { register, isPending } = useApiRegister();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    await register(name.trim(), role);
    // Close modal on success
    if (!isPending) {
      setName('');
      setRole('MENTOR');
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Join WomanTech Connect
          </DialogTitle>
          <DialogDescription>
            Register to start your mentorship journey. Choose your role and let's connect!
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Display Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              disabled={isPending}
              required
            />
          </div>

          <div className="space-y-3">
            <Label>I want to be a:</Label>
            <RadioGroup
              value={role}
              onValueChange={(value) => setRole(value as 'MENTOR' | 'MENTEE')}
              disabled={isPending}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="MENTOR" id="mentor" />
                <Label htmlFor="mentor" className="flex-1 cursor-pointer">
                  <div>
                    <div className="font-medium">Mentor</div>
                    <div className="text-sm text-muted-foreground">
                      Share your expertise and guide others
                    </div>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="MENTEE" id="mentee" />
                <Label htmlFor="mentee" className="flex-1 cursor-pointer">
                  <div>
                    <div className="font-medium">Mentee</div>
                    <div className="text-sm text-muted-foreground">
                      Learn from experienced professionals
                    </div>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isPending}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending || !name.trim()}
              className="flex-1"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Registering...
                </>
              ) : (
                'Register'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
