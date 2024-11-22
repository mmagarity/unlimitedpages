import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  useToast,
  Container,
} from '@chakra-ui/react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

/**
 * ResetPassword Component
 * Handles password reset functionality
 * Features:
 * - Email validation
 * - Password reset request through Supabase
 * - Error handling with toast notifications
 * - Loading state management
 */
export const ResetPassword: React.FC = () => {
  // Form state management
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Hooks
  const { resetPassword } = useAuth();
  const toast = useToast();

  /**
   * Handle form submission
   * Sends password reset email through Supabase
   * Shows success/error feedback to user
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await resetPassword(email);
      toast({
        title: 'Success!',
        description: 'Check your email for password reset instructions.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to reset password',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxW="container.sm" py={10}>
      <Box p={8} borderWidth={1} borderRadius={8} boxShadow="lg">
        <VStack spacing={4} as="form" onSubmit={handleSubmit}>
          {/* Email Input */}
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          
          {/* Submit Button */}
          <Button
            type="submit"
            colorScheme="blue"
            width="full"
            isLoading={loading}
          >
            Reset Password
          </Button>
          
          {/* Navigation Links */}
          <Link to="/signin">
            <Text color="blue.500">Back to Sign In</Text>
          </Link>
        </VStack>
      </Box>
    </Container>
  );
};
