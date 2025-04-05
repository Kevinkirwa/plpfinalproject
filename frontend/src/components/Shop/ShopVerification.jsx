import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import server from '../../server';

const ShopVerification = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyShop = async () => {
      try {
        const token = searchParams.get('token');
        if (!token) {
          toast.error('Invalid verification link');
          navigate('/login');
          return;
        }

        const response = await server.get(`/shop/verify-shop?token=${token}`);
        if (response.data.success) {
          toast.success('Shop verified successfully!');
          navigate('/login?verified=true');
        }
      } catch (error) {
        console.error('Verification error:', error);
        toast.error(error.response?.data?.message || 'Verification failed');
        navigate('/login');
      }
    };

    verifyShop();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Verifying your shop...
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Please wait while we verify your shop account.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShopVerification; 