import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface UseFormSubmissionProps {
  successMessage?: string;
  redirectPath: string;
}

export const useFormSubmission = ({ successMessage, redirectPath }: UseFormSubmissionProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate(redirectPath);
      toast.success(successMessage);
    }, 2000);
  };

  return {
    isLoading,
    handleSubmit,
  };
};
