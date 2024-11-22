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
 * SignIn Component
 * Handles user authentication with email and password
 * Features:
 * - Email/password form validation
 * - Error handling with toast notifications
 * - Links to sign up and password reset
 * - Loading state management
 */
export const SignIn: React.FC = () => {
  // Form state management
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Hooks
  const { signIn } = useAuth();
  const toast = useToast();

  /**
   * Handle form submission
   * Attempts to sign in the user and shows appropriate feedback
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await signIn(email, password);
      toast({
        title: 'Success!',
        description: 'You have successfully signed in.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to sign in',
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
          
          {/* Password Input */}
          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          
          {/* Submit Button */}
          <Button
            type="submit"
            colorScheme="blue"
            width="full"
            isLoading={loading}
          >
            Sign In
          </Button>
          
          {/* Navigation Links */}
          <Text>
            Don't have an account?{' '}
            <Link to="/signup">
              <Text as="span" color="blue.500">
                Sign Up
              </Text>
            </Link>
          </Text>
          <Link to="/reset-password">
            <Text color="blue.500">Forgot Password?</Text>
          </Link>
        </VStack>
      </Box>
    </Container>
  );
};
