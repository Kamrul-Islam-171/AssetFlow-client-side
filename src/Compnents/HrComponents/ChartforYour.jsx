import React, { PureComponent, useContext } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import { AuthContext } from '../../Provider/AuthProvider';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { Legend } from '@headlessui/react';




const COLORS = ['#0088FE', '#00C49F'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
const ChartforYour = () => {
  const dataInfo = [];

  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: retunrabe = '', isLoading: isLoading1 } = useQuery({
    queryKey: ['returnable', user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/returnable/${user?.email}`);
      dataInfo.push({ name: 'Returnable', value: data.count })
      return data.count
    }
  })
  const { data: nonRetunrabe = '', isLoading: isLoading2 } = useQuery({
    queryKey: ['non-returnable', user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/non-returnable/${user?.email}`);
      dataInfo.push({ name: 'Returnable', value: data.count })
      return data.count
    }
  })
  if (loading || isLoading1 || isLoading2) return <LoadingSpinner></LoadingSpinner>
  // const x = {name : 'Returnable', value : retunrabe};
  // const y = {name : 'Non Returnable', value : nonRetunrabe};
  // data.push(x);
  // data.push(y);
  if (retunrabe && nonRetunrabe && dataInfo.length === 0) {
    for (let x = 1; x <= 2; x++) {
      if (x == 1) {
        dataInfo.push({ name: 'Returnable', value: retunrabe })
      }
      else {
        dataInfo.push({ name: 'Non Returnable', value: nonRetunrabe })
      }
    }
  }
  console.log('data = ', dataInfo)


  return (
    <div className=' h-[300px] mt-20'>
      {/* <p>{retunrabe}</p>
      <p>{nonRetunrabe}</p> */}
      <p className='text-4xl text-center'>Comparison Chart</p>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            data={dataInfo}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {dataInfo.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          {/* <Legend></Legend> */}
        </PieChart>
      </ResponsiveContainer>
      <div className='text-center flex gap-5 justify-center'>
        <p className='text-[#0088FE]'>Retunrable</p>
        <p className='text-[#00C49F]'>Non Retunrabe</p>
      </div>
    </div>
  );
};

export default ChartforYour;