import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Grid,
    Paper,
    CircularProgress,
    Divider,
} from "@mui/material";
import {
    BarChart,
    Bar,
    PieChart,
    Pie,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Legend,
    RadialBarChart,
    RadialBar,
    AreaChart,
    Area,
    ResponsiveContainer,
} from "recharts";

const Statistics = () => {
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8000/get")
            .then((response) => {
                if (!response.ok) throw new Error("Failed to fetch data");
                return response.json();
            })
            .then((data) => {
                setLeads(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">{error}</Typography>;

    const totalLeads = leads.length;

    // Data aggregation
    const leadSources = leads.reduce((acc, lead) => {
        acc[lead.leadsource] = (acc[lead.leadsource] || 0) + 1;
        return acc;
    }, {});

    const leadStages = leads.reduce((acc, lead) => {
        acc[lead.stage] = (acc[lead.stage] || 0) + 1;
        return acc;
    }, {});

    const leadStatus = leads.reduce((acc, lead) => {
        acc[lead.status] = (acc[lead.status] || 0) + 1;
        return acc;
    }, {});

    const monthlyLeads = leads.reduce((acc, lead) => {
        const month = new Date(lead.followupdate).toLocaleString("default", {
            month: "short",
        });
        acc[month] = (acc[month] || 0) + 1;
        return acc;
    }, {});

    const convertDataToChart = (data) =>
        Object.entries(data).map(([name, count]) => ({ name, count }));

    const leadSourceData = convertDataToChart(leadSources);
    const leadStageData = convertDataToChart(leadStages);
    const leadStatusData = convertDataToChart(leadStatus);
    const monthlyData = convertDataToChart(monthlyLeads);

    const conversionRate = ((leadStatus["Converted"] / totalLeads) * 100).toFixed(2);

    return (
        <Box m="20px" p="20px" sx={{ backgroundColor: "#f4f4f4", borderRadius: "15px" }}>
            <Typography variant="h2" fontWeight="bold" mb="20px" sx={{ color: "black", textAlign: "left" }}>
                Lead Statistics
            </Typography>

            {/* Key Metrics */}
            <Paper elevation={3} sx={{ padding: "20px", mb: "20px", textAlign: "center" }}>
                <Typography variant="h5" sx={{fontWeight: "bold", fontSize: "20px"}}>Total Leads: {totalLeads}</Typography>
                <Typography variant="h5" color="black" sx={{fontWeight: "bold", fontSize: "20px"}}>
                     Conversion Rate: {conversionRate}%
                </Typography>
            </Paper>

            <Grid container spacing={3}>
                {/* Bar Chart Section */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ padding: "20px" }}>
                        <Typography variant="h5" mb={2} sx={{fontWeight: "bold", fontSize: "20px"}}>
                            Leads by Stage
                        </Typography>
                        <BarChart width={400} height={300} data={leadStageData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="count" fill="rgb(5,78,90)" barSize={40} />
                        </BarChart>
                    </Paper>
                </Grid>

                {/* Pie Chart Section */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ padding: "20px", textAlign: "center" }}>
                        <Typography variant="h5" mb={2} sx={{fontWeight: "bold", fontSize: "20px"}}>
                            Lead Sources Breakdown
                        </Typography>

                        <PieChart width={300} height={300}>
                            <Pie
                                data={leadSourceData}
                                dataKey="count"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                innerRadius={60} // Donut style
                                outerRadius={100}
                                fill="rgb(5,78,90)"
                                paddingAngle={5}
                                label={({ name, percent }) =>
                                    `${name} ${(percent * 100).toFixed(0)}%`
                                }
                            />
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </Paper>
                </Grid>

                {/* Line Chart for Monthly Trends */}
               <Grid item xs={12}>
                    <Paper elevation={3} sx={{ padding: "20px", textAlign: "center" }}>
                        <Typography variant="h5" mb={2} sx={{fontWeight: "bold", fontSize: "20px"}}>
                            Monthly Lead Trends
                        </Typography>
                        <LineChart width={600} height={300} data={monthlyData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="count" stroke="rgb(5,78,90)" strokeWidth={2} />
                        </LineChart>
                    </Paper>
                </Grid> 
                {/* Line Chart for Monthly Trends */}





                {/* Radial Chart for Lead Status */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ padding: "20px", textAlign: "center" }}>
                        <Typography variant="h5" mb={2} sx={{fontWeight: "bold", fontSize: "20px"}}>
                            Lead Status Overview
                        </Typography>
                        <RadialBarChart width={300} height={300} innerRadius="10%" outerRadius="80%" data={leadStatusData}>
                            <RadialBar minAngle={15} dataKey="count" fill="rgb(5,78,90)" />
                            <Tooltip />
                        </RadialBarChart>
                    </Paper>
                </Grid>

                {/* Area Chart for Status Performance */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ padding: "20px", textAlign: "center" }}>
                        <Typography variant="h5" mb={2} sx={{fontWeight: "bold", fontSize: "20px"}}>
                            Lead Performance (Area Chart)
                        </Typography>
                        <AreaChart width={400} height={300} data={leadStatusData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Area type="monotone" dataKey="count" stroke="rgb(5,78,90)" fill="rgb(5,78,90)" />
                        </AreaChart>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};
export default Statistics;