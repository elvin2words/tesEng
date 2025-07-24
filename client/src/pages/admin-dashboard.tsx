
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { AlertCircle, TrendingUp, Users, Mail, Filter, Search, Star, Clock, CheckCircle } from "lucide-react";

interface Quote {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  location: string;
  projectType: string;
  systemSpecs?: string;
  estimatedBudget?: string;
  priorityScore: number;
  urgencyLevel: string;
  readinessToBuy: string;
  followUpStatus: string;
  assignedTo?: string;
  lastContactDate?: string;
  createdAt: string;
}

interface Analytics {
  totalQuotes: number;
  highPriority: number;
  mediumPriority: number;
  lowPriority: number;
  pendingFollowUp: number;
  contacted: number;
  converted: number;
  byProjectType: Record<string, number>;
  byLocation: Record<string, number>;
  averageScore: number;
}

export default function AdminDashboard() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [filteredQuotes, setFilteredQuotes] = useState<Quote[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');

  useEffect(() => {
    fetchQuotes();
    fetchAnalytics();
  }, []);

  useEffect(() => {
    filterQuotes();
  }, [quotes, searchTerm, filterStatus, filterPriority]);

  const fetchQuotes = async () => {
    try {
      const response = await fetch('/api/admin/quotes');
      const data = await response.json();
      setQuotes(data);
    } catch (error) {
      console.error('Failed to fetch quotes:', error);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('/api/admin/analytics');
      const data = await response.json();
      setAnalytics(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
      setIsLoading(false);
    }
  };

  const filterQuotes = () => {
    let filtered = quotes;

    if (searchTerm) {
      filtered = filtered.filter(quote =>
        quote.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quote.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quote.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quote.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quote.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(quote => quote.followUpStatus === filterStatus);
    }

    if (filterPriority !== 'all') {
      filtered = filtered.filter(quote => {
        if (filterPriority === 'high') return quote.priorityScore >= 80;
        if (filterPriority === 'medium') return quote.priorityScore >= 50 && quote.priorityScore < 80;
        if (filterPriority === 'low') return quote.priorityScore < 50;
        return true;
      });
    }

    setFilteredQuotes(filtered);
  };

  const updateQuoteStatus = async (quoteId: number, status: string) => {
    try {
      await fetch(`/api/admin/quotes/${quoteId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      fetchQuotes();
      fetchAnalytics();
    } catch (error) {
      console.error('Failed to update quote:', error);
    }
  };

  const sendFollowUpEmail = async (quoteId: number, templateType: string) => {
    try {
      await fetch(`/api/admin/quotes/${quoteId}/email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ templateType })
      });
      alert('Follow-up email sent successfully!');
    } catch (error) {
      console.error('Failed to send email:', error);
    }
  };

  const getPriorityBadge = (score: number) => {
    if (score >= 80) return <Badge className="bg-red-500">High Priority</Badge>;
    if (score >= 50) return <Badge className="bg-yellow-500">Medium Priority</Badge>;
    return <Badge variant="secondary">Low Priority</Badge>;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'contacted': return <Mail className="w-4 h-4 text-blue-500" />;
      case 'converted': return <CheckCircle className="w-4 h-4 text-green-500" />;
      default: return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-solar-orange mx-auto mb-4"></div>
          <p>Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            TES Admin Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            AI-powered quote management and customer insights
          </p>
        </div>

        {/* Analytics Cards */}
        {analytics && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Quotes</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.totalQuotes}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">High Priority</CardTitle>
                <AlertCircle className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{analytics.highPriority}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Follow-up</CardTitle>
                <Clock className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">{analytics.pendingFollowUp}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average AI Score</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {Math.round(analytics.averageScore)}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <Tabs defaultValue="quotes" className="space-y-6">
          <TabsList>
            <TabsTrigger value="quotes">Quote Management</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="emails">Email Templates</TabsTrigger>
          </TabsList>

          <TabsContent value="quotes" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Filter & Search
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search by name, email, company, or location..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="contacted">Contacted</SelectItem>
                      <SelectItem value="converted">Converted</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterPriority} onValueChange={setFilterPriority}>
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="Filter by priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Priorities</SelectItem>
                      <SelectItem value="high">High Priority</SelectItem>
                      <SelectItem value="medium">Medium Priority</SelectItem>
                      <SelectItem value="low">Low Priority</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Quotes List */}
            <div className="space-y-4">
              {filteredQuotes.map((quote) => (
                <Card key={quote.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold text-lg">
                            {quote.firstName} {quote.lastName}
                          </h3>
                          {getPriorityBadge(quote.priorityScore)}
                          <div className="flex items-center gap-1">
                            {getStatusIcon(quote.followUpStatus)}
                            <span className="text-sm text-gray-600 capitalize">
                              {quote.followUpStatus}
                            </span>
                          </div>
                        </div>
                        
                        <div className="text-sm text-gray-600 space-y-1">
                          <p><strong>Email:</strong> {quote.email}</p>
                          {quote.phone && <p><strong>Phone:</strong> {quote.phone}</p>}
                          {quote.company && <p><strong>Company:</strong> {quote.company}</p>}
                          <p><strong>Location:</strong> {quote.location}</p>
                          <p><strong>Project:</strong> {quote.projectType}</p>
                          {quote.estimatedBudget && (
                            <p><strong>Budget:</strong> {quote.estimatedBudget}</p>
                          )}
                        </div>

                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>AI Score: {quote.priorityScore}/100</span>
                          <span>Urgency: {quote.urgencyLevel}</span>
                          <span>Readiness: {quote.readinessToBuy}</span>
                          <span>Submitted: {new Date(quote.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 lg:w-48">
                        <Select
                          value={quote.followUpStatus}
                          onValueChange={(status) => updateQuoteStatus(quote.id, status)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="contacted">Contacted</SelectItem>
                            <SelectItem value="converted">Converted</SelectItem>
                          </SelectContent>
                        </Select>

                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => sendFollowUpEmail(quote.id, 'follow_up')}
                            className="flex-1"
                          >
                            <Mail className="w-4 h-4 mr-1" />
                            Follow-up
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => sendFollowUpEmail(quote.id, 'quote_explanation')}
                            className="flex-1"
                          >
                            Quote Email
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            {analytics && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Project Types</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {Object.entries(analytics.byProjectType).map(([type, count]) => (
                          <div key={type} className="flex justify-between">
                            <span className="capitalize">{type}</span>
                            <span className="font-semibold">{count}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Top Locations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {Object.entries(analytics.byLocation)
                          .sort(([,a], [,b]) => b - a)
                          .slice(0, 10)
                          .map(([location, count]) => (
                          <div key={location} className="flex justify-between">
                            <span>{location}</span>
                            <span className="font-semibold">{count}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="emails">
            <Card>
              <CardHeader>
                <CardTitle>Email Template Management</CardTitle>
                <p className="text-sm text-gray-600">
                  Manage automated email responses sent to customers
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="p-4">
                      <h4 className="font-semibold mb-2">Welcome Email</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Sent immediately after quote submission
                      </p>
                      <Button size="sm" variant="outline">Edit Template</Button>
                    </Card>
                    
                    <Card className="p-4">
                      <h4 className="font-semibold mb-2">Follow-up Email</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Manual follow-up for pending quotes
                      </p>
                      <Button size="sm" variant="outline">Edit Template</Button>
                    </Card>
                    
                    <Card className="p-4">
                      <h4 className="font-semibold mb-2">Quote Explanation</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Detailed breakdown of quote components
                      </p>
                      <Button size="sm" variant="outline">Edit Template</Button>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
