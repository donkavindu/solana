'use client';
import { Button } from "@/components/ui/button";
import { useState, useEffect } from 'react';

interface FormComponentProps {
  onSubmit: (data: any) => Promise<void>;
  walletAddress: string;
  transactionHash: string;
  productName: string;
}

export default function FormComponent({
  walletAddress,
  transactionHash,
  productName,
}: FormComponentProps) {
  const [formData, setFormData] = useState({
    name: '',
    telegramId: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isExisting, setIsExisting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `/api/getdata?productName=${productName}&walletAddress=${walletAddress}`
        );
        const data = await res.json();

        if (data) {
          setIsExisting(true);
          setFormData({
            name: data.name || '',
            telegramId: data.TelegramId || '',
            email: data.email || '',
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [productName, walletAddress]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
  
    const payload = {
      productName,
      walletAddress,
      transactionHash, // Include transactionHash in the payload
      name: formData.name,
      TelegramId: formData.telegramId,
      email: formData.email,
    };
  
    try {
      const endpoint = isExisting ? '/api/update' : '/api/create';
      const method = isExisting ? 'PUT' : 'POST';
  
      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
  
      if (res.ok) {
        setMessage(isExisting ? 'Product updated successfully!' : 'User created successfully!');
        if (!isExisting) {
          setFormData({ name: '', telegramId: '', email: '' });
        }
      } else {
        setMessage('Failed to submit the form.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setMessage('An error occurred.');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-[350px] lg:w-[350px] flex flex-col px-5 py-10 border border-[#FD60F3] rounded-xl">
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-[#fff] rounded bg-transparent"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Telegram ID</label>
        <input
          type="text"
          name="telegramId"
          value={formData.telegramId}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-[#fff] rounded bg-transparent"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-[#fff] rounded bg-transparent"
          required
        />
      </div>
      <Button
        type="submit"
        className="rounded-full bg-gradient-to-r from-[#4a66fe] via-[#9852fe] to-[#ce45ff] text-white hover:bg-gradient-to-l active:bg-[#B529DC] hover:scale-105 duration-300 flex items-end justify-center px-12 mt-5"
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Submit'}
      </Button>
      {message && <p className="mt-4 text-sm text-gray-700 w-full text-center">{message}</p>}
    </form>
  );
}
