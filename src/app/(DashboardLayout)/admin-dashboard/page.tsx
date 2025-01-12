"use client";

import { Card, CardBody } from "@nextui-org/card";
import { Users, FileText, CreditCard, Users2, LucideIcon } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Loading from "@/src/components/UI/Loading";
import { useGetAdminOverviewData } from "@/src/hooks/overview.hook";

// Types for the API response data
interface Post {
  _id: string;
  title: string;
  image: string;
  category: string[];
  createdAt: string;
  upvotes: string[];
}

interface ChartDataPoint {
  month: string;
  count: number;
}

interface OverviewData {
  data: {
    counts: {
      userCounts: number;
      paymentCounts: number;
      postsCounts: number;
      groupCounts: number;
    };
    recentPosts: Post[];
    chartsData: {
      postsChartData: ChartDataPoint[];
      paymentsChartData: ChartDataPoint[];
    };
  };
}

// Component Props Interfaces
interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  color: string;
}

interface MonthlyChartProps {
  data: ChartDataPoint[] | undefined;
  title: string;
  color: string;
  id: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, color }) => (
  <Card className="w-full">
    <CardBody className="flex flex-row items-center gap-4 p-6">
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h4 className="text-2xl font-bold">{value}</h4>
      </div>
    </CardBody>
  </Card>
);

const MonthlyChart: React.FC<MonthlyChartProps> = ({ data, title, color, id }) => (
  <Card className="w-full h-[400px]">
    <CardBody>
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data?.map((item, index) => ({
            ...item,
            uniqueId: `${id}-${index}`
          }))}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="month"
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            tick={{ fontSize: 12 }}
          />
          <Tooltip />
          <Legend />
          <Bar 
            dataKey="count" 
            fill={color} 
            name={title}
            key={`bar-${id}`}
          />
        </BarChart>
      </ResponsiveContainer>
    </CardBody>
  </Card>
);

const RecentPostsTable: React.FC<{ posts: Post[] }> = ({ posts }) => (
  <Card className="w-full max-w-4xl mx-auto">
    <CardBody>
      <h3 className="text-xl font-semibold mb-4">Recent Posts</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-4">Title</th>
              <th className="text-left py-3 px-4">Category</th>
              <th className="text-left py-3 px-4">Date</th>
              <th className="text-left py-3 px-4">Upvotes</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post._id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    {post.image && (
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-10 h-10 rounded object-cover"
                      />
                    )}
                    <span className="font-medium truncate max-w-[200px]">{post.title}</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex flex-wrap gap-2">
                    {post.category.map((cat) => (
                      <span 
                        key={`${post._id}-${cat}`}
                        className="px-2 py-1 text-xs rounded-full bg-gray-100"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="py-3 px-4 whitespace-nowrap">
                  {new Date(post.createdAt).toLocaleDateString()}
                </td>
                <td className="py-3 px-4">
                  {post.upvotes.length}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CardBody>
  </Card>
);

const DashboardPage: React.FC = () => {
  const { data: overviewData, isLoading } = useGetAdminOverviewData() as { 
    data: OverviewData | undefined; 
    isLoading: boolean 
  };

  if (isLoading) return <Loading />;

  const stats: StatCardProps[] = [
    {
      title: "Total Users",
      value: overviewData?.data.counts.userCounts || 0,
      icon: Users,
      color: "bg-blue-500"
    },
    {
      title: "Total Posts",
      value: overviewData?.data.counts.postsCounts || 0,
      icon: FileText,
      color: "bg-purple-500"
    },
    {
      title: "Total Payments",
      value: overviewData?.data.counts.paymentCounts || 0,
      icon: CreditCard,
      color: "bg-green-500"
    },
    {
      title: "Total Groups",
      value: overviewData?.data.counts.groupCounts || 0,
      icon: Users2,
      color: "bg-orange-500"
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MonthlyChart 
          data={overviewData?.data.chartsData.postsChartData} 
          title="Monthly Posts"
          color="#8884d8"
          id="posts"
        />
        <MonthlyChart 
          data={overviewData?.data.chartsData.paymentsChartData}
          title="Monthly Payments"
          color="#82ca9d"
          id="payments"
        />
      </div>

      {/* Recent Posts Table */}
      <div className="flex justify-center">
        <RecentPostsTable posts={overviewData?.data.recentPosts || []} />
      </div>
    </div>
  );
};

export default DashboardPage;