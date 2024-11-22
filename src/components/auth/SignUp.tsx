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
import { Link, useNavigate } from 'react-router-dom';

/**
 * SignUp Component
 * Handles new user registration with email and password
 * Features:
 * - Email/password form validation
 * - Password confirmation check
 * - Error handling with toast notifications
 * - Automatic redirect to payment page after successful signup
 * - Loading state management
 */
export const SignUp: React.FC = () => {
  // Form state management
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Hooks
  const { signUp } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  /**
   * Handle form submission
   * Validates passwords match, creates new user account,
   * and redirects to payment page on success
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate passwords match
    if (password !== confirmPassword) {
      return toast({
        title: 'Error',
        description: 'Passwords do not match',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }

    try {
      setLoading(true);
      await signUp(email, password);
      toast({
        title: 'Success!',
        description: 'Please check your email to confirm your account.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      // Redirect to payment page after successful signup
      navigate('/payment');
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to sign up',
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
          
          {/* Confirm Password Input */}
          <FormControl isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </FormControl>
          
          {/* Submit Button */}
          <Button
            type="submit"
            colorScheme="blue"
            width="full"
            isLoading={loading}
          >
            Sign Up
          </Button>
          
          {/* Navigation Links */}
          <Text>
            Already have an account?{' '}
            <Link to="/signin">
              <Text as="span" color="blue.500">
                Sign In
              </Text>
            </Link>
          </Text>
        </VStack>
      </Box>
    </Container>
  );
};
