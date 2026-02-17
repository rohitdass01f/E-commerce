import {
  BarChart,
  Bar,
  XAxis,
  PieChart,
  Pie,
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import "./dashboard.css";

/* =========================
   AUTO DATE GENERATORS
========================= */

// Last N months
const getLastMonths = (count = 6) => {
  const now = new Date();
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (count - 1 - i), 1);
    return {
      name: d.toLocaleString("default", { month: "short" }),
      uv: 0, // real data baad me backend se
    };
  });
};

// Last N days
const getLastDays = (count = 7) => {
  const now = new Date();
  return Array.from({ length: count }, (_, i) => {
    const d = new Date();
    d.setDate(now.getDate() - (count - 1 - i));
    return {
      name: d.toLocaleDateString("en-US", { weekday: "short" }),
      value: 0, // real data later
    };
  });
};

const barData = getLastMonths(6);
const lineData = getLastDays(7);

const pieOuter = [
  { name: "Completed", value: 75.5 },
  { name: "Remaining", value: 24.5 },
];

const pieInner = [
  { name: "Sales", value: 40 },
  { name: "Orders", value: 20 },
  { name: "Users", value: 15.5 },
];

/* =========================
   COMPONENT
========================= */

const Dashboard = ({ dashboard }) => {
  if (!dashboard) return null;

  const stats = [
    { title: "Users", value: dashboard.totalUsers },
    { title: "Orders", value: dashboard.totalOrders },
    { title: "Revenue", value: `₹${dashboard.totalRevenue}` },
    { title: "Growth", value: "—" },
  ];

  return (
    <div className="dashboard">
      {/* ===== STATS ===== */}
      <div className="stats-grid">
        {stats.map((s, i) => (
          <div className="stat-card" key={i}>
            <p>{s.title}</p>
            <h2>{s.value}</h2>
          </div>
        ))}
      </div>

      {/* ===== CHARTS ===== */}
      <div className="charts-grid">
        {/* BAR */}
        <div className="card">
          <h3>Monthly Sales</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData} barCategoryGap={30}>
              <XAxis dataKey="name" />
              <Tooltip />
              <Bar
                dataKey="uv"
                fill="#4f46e5" // 👈 SOLID BLUE
                fillOpacity={1} // 👈 FORCE COLOR
                radius={[10, 10, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* PIE */}
        <div className="card pie-card">
          <h3>Monthly Target</h3>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={pieOuter}
                dataKey="value"
                outerRadius="70%"
                fill="#4f46e5" // 👈 DARK BLUE
              />

              <Pie
                data={pieInner}
                dataKey="value"
                innerRadius="75%"
                outerRadius="90%"
                fill="#a5b4fc" // 👈 LIGHT BLUE
              />

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="pie-center">75.5%</div>
        </div>
      </div>

      {/* ===== LINE ===== */}
      <div className="card">
        <h3>Last 7 Days Activity</h3>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={lineData}>
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#4f46e5"
              strokeWidth={3}
              dot={{ r: 4, fill: "#4f46e5" }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
