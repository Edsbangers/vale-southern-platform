'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  Upload,
  Image as ImageIcon,
  FileText,
  Send,
  Sparkles,
  CheckCircle2,
  Clock,
  AlertCircle,
  Linkedin,
  Globe,
  Shield,
  Building2,
  TrendingUp,
  Users,
  Calendar,
  ChevronRight,
  Bot,
  RefreshCw,
  Copy,
  Download,
  X,
  Menu,
  LogOut,
  Bell,
  Settings,
  HardHat,
  ClipboardCheck
} from 'lucide-react';

interface NewsUpdate {
  id: string;
  title: string;
  content: string;
  linkedInSnippet: string;
  sheqCompliance: string[];
  imageUrl: string;
  status: 'draft' | 'published' | 'scheduled';
  createdAt: Date;
  project: string;
}

interface Project {
  id: string;
  name: string;
  location: string;
  sector: string;
  progress: number;
  status: 'on-track' | 'attention' | 'at-risk';
  pm: string;
}

const projects: Project[] = [
  { id: '1', name: 'Portsmouth Hospital Critical Care', location: 'Portsmouth', sector: 'Healthcare', progress: 72, status: 'on-track', pm: 'James Wilson' },
  { id: '2', name: 'Southampton University Engineering', location: 'Southampton', sector: 'Education', progress: 45, status: 'on-track', pm: 'Sarah Chen' },
  { id: '3', name: 'Lakeside Business Park', location: 'Cosham', sector: 'Commercial', progress: 88, status: 'attention', pm: 'Michael Brown' },
  { id: '4', name: 'Whiteley Residential Phase 2', location: 'Whiteley', sector: 'Residential', progress: 23, status: 'on-track', pm: 'Emma Davis' },
];

const recentUpdates: NewsUpdate[] = [
  {
    id: '1',
    title: 'Steel Frame Completion at Portsmouth Hospital',
    content: 'Major milestone achieved as the steel frame structure for the new critical care wing is now complete.',
    linkedInSnippet: 'Proud moment for Vale Southern as we complete the steel frame on our £45M Portsmouth Hospital project.',
    sheqCompliance: ['H&S Method Statement Updated', 'Crane Operations Log Signed', 'Weekly Inspection Complete'],
    imageUrl: '/uploads/portsmouth-steel.jpg',
    status: 'published',
    createdAt: new Date('2025-01-10'),
    project: 'Portsmouth Hospital Critical Care'
  },
  {
    id: '2',
    title: 'Foundation Pour at Southampton University',
    content: 'Successfully completed the foundation pour for Block A of the new Engineering Building.',
    linkedInSnippet: 'Another step forward at University of Southampton. Foundation pour complete for our BREEAM Outstanding facility.',
    sheqCompliance: ['Concrete Pour Checklist Complete', 'Environmental Monitoring Active'],
    imageUrl: '/uploads/southampton-foundation.jpg',
    status: 'draft',
    createdAt: new Date('2025-01-08'),
    project: 'Southampton University Engineering'
  }
];

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [pmMessage, setPmMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<{
    newsUpdate: string;
    linkedInSnippet: string;
    seoTitle: string;
    sheqTags: string[];
  } | null>(null);
  const [selectedProject, setSelectedProject] = useState(projects[0].id);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateContent = async () => {
    if (!pmMessage.trim()) return;

    setIsGenerating(true);

    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    const project = projects.find(p => p.id === selectedProject);

    setGeneratedContent({
      newsUpdate: `**Major Milestone at ${project?.name}**\n\n${pmMessage}\n\nThis achievement demonstrates Vale Southern's continued commitment to delivering excellence across our ${project?.sector.toLowerCase()} portfolio. The project remains on track and our team continues to uphold the highest standards of safety and quality.\n\nFor more information about this project, please contact our communications team.`,
      linkedInSnippet: `Exciting progress at ${project?.name}! ${pmMessage} #Construction #${project?.sector} #DeliveringCertainty #ValeSouthern`,
      seoTitle: `${project?.name} - ${pmMessage.split(' ').slice(0, 6).join(' ')}... | Vale Southern`,
      sheqTags: [
        'Site Photo Documentation',
        'Progress Report Cross-Referenced',
        'Golden Thread Updated',
        `${project?.sector} Compliance Verified`
      ]
    });

    setIsGenerating(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-track': return 'text-green-500 bg-green-50';
      case 'attention': return 'text-yellow-500 bg-yellow-50';
      case 'at-risk': return 'text-red-500 bg-red-50';
      default: return 'text-gray-500 bg-gray-50';
    }
  };

  const stats = [
    { label: 'Active Projects', value: '12', icon: Building2, trend: '+2' },
    { label: 'This Month Updates', value: '24', icon: FileText, trend: '+8' },
    { label: 'SHEQ Compliance', value: '98%', icon: Shield, trend: '+1%' },
    { label: 'Team Members', value: '156', icon: Users, trend: '+4' },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Top Header */}
      <header className="bg-[#002147] text-white h-16 flex items-center justify-between px-6 fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-[#003366] rounded-lg mr-4 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
              <span className="text-[#002147] font-bold text-sm">VS</span>
            </div>
            <div className="hidden sm:block">
              <div className="text-sm font-semibold">Project Lead Hub</div>
              <div className="text-xs text-[#c5a572]">Vale Southern Construction</div>
            </div>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-[#003366] rounded-lg relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button className="p-2 hover:bg-[#003366] rounded-lg">
            <Settings className="h-5 w-5" />
          </button>
          <div className="flex items-center space-x-3 pl-4 border-l border-[#003366]">
            <div className="w-8 h-8 bg-[#c5a572] rounded-full flex items-center justify-center text-[#002147] font-semibold text-sm">
              JW
            </div>
            <div className="hidden md:block">
              <div className="text-sm font-medium">James Wilson</div>
              <div className="text-xs text-gray-400">Project Manager</div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex pt-16">
        {/* Sidebar */}
        <aside className={`w-64 bg-white border-r border-gray-200 fixed left-0 top-16 bottom-0 z-40 transform transition-transform duration-200 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
          <nav className="p-4 space-y-1">
            <Link href="/admin" className="flex items-center px-4 py-3 bg-[#002147]/5 text-[#002147] rounded-lg font-medium">
              <LayoutDashboard className="h-5 w-5 mr-3" />
              Dashboard
            </Link>
            <Link href="/admin/content" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
              <FileText className="h-5 w-5 mr-3" />
              Content Manager
            </Link>
            <Link href="/admin/projects" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
              <Building2 className="h-5 w-5 mr-3" />
              Projects
            </Link>
            <Link href="/admin/sheq" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
              <Shield className="h-5 w-5 mr-3" />
              SHEQ Log
            </Link>
            <Link href="/admin/team" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
              <Users className="h-5 w-5 mr-3" />
              Team
            </Link>
          </nav>

          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
            <Link href="/" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
              <Globe className="h-5 w-5 mr-3" />
              View Website
            </Link>
            <button className="w-full flex items-center px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg">
              <LogOut className="h-5 w-5 mr-3" />
              Sign Out
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className={`flex-1 ${sidebarOpen ? 'lg:ml-64' : ''} transition-all duration-200`}>
          <div className="p-6">
            {/* Welcome Header */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-[#002147]">Good morning, James</h1>
              <p className="text-gray-600">Here&apos;s what&apos;s happening across your projects today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 bg-[#002147]/5 rounded-lg flex items-center justify-center">
                      <stat.icon className="h-5 w-5 text-[#002147]" />
                    </div>
                    <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                      {stat.trend}
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-[#002147]">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Agent-Led CMS */}
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-[#002147] rounded-lg flex items-center justify-center mr-3">
                        <Bot className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h2 className="font-semibold text-[#002147]">AI Content Assistant</h2>
                        <p className="text-sm text-gray-500">Generate news updates from site photos</p>
                      </div>
                    </div>
                    <Sparkles className="h-5 w-5 text-[#c5a572]" />
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  {/* Project Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Project</label>
                    <select
                      value={selectedProject}
                      onChange={(e) => setSelectedProject(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#002147] focus:border-transparent"
                    >
                      {projects.map((project) => (
                        <option key={project.id} value={project.id}>{project.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Upload Site Photo</label>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    {uploadedImage ? (
                      <div className="relative">
                        <img
                          src={uploadedImage}
                          alt="Uploaded"
                          className="w-full h-40 object-cover rounded-lg"
                        />
                        <button
                          onClick={() => setUploadedImage(null)}
                          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full h-40 border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center text-gray-400 hover:border-[#002147] hover:text-[#002147] transition-colors"
                      >
                        <Upload className="h-8 w-8 mb-2" />
                        <span className="text-sm">Click to upload or drag and drop</span>
                        <span className="text-xs">PNG, JPG up to 10MB</span>
                      </button>
                    )}
                  </div>

                  {/* PM Message */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Update</label>
                    <textarea
                      value={pmMessage}
                      onChange={(e) => setPmMessage(e.target.value)}
                      placeholder="E.g., 'Topped out at the Portsmouth Hospital project today'"
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#002147] focus:border-transparent resize-none"
                    />
                  </div>

                  {/* Generate Button */}
                  <button
                    onClick={handleGenerateContent}
                    disabled={!pmMessage.trim() || isGenerating}
                    className="w-full py-3 bg-[#002147] text-white font-medium rounded-lg hover:bg-[#003366] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                        Generating Content...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-5 w-5 mr-2" />
                        Generate with AI
                      </>
                    )}
                  </button>

                  {/* Generated Content */}
                  {generatedContent && (
                    <div className="space-y-4 pt-4 border-t border-gray-100">
                      {/* News Update */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700 flex items-center">
                            <FileText className="h-4 w-4 mr-2" />
                            News Update
                          </span>
                          <button className="text-gray-400 hover:text-[#002147]">
                            <Copy className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="text-sm text-gray-600 whitespace-pre-line">{generatedContent.newsUpdate}</p>
                      </div>

                      {/* LinkedIn Snippet */}
                      <div className="bg-blue-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-blue-700 flex items-center">
                            <Linkedin className="h-4 w-4 mr-2" />
                            LinkedIn Snippet
                          </span>
                          <button className="text-blue-400 hover:text-blue-700">
                            <Copy className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="text-sm text-blue-600">{generatedContent.linkedInSnippet}</p>
                      </div>

                      {/* SEO Title */}
                      <div className="bg-green-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-green-700 flex items-center">
                            <Globe className="h-4 w-4 mr-2" />
                            SEO Optimised Title
                          </span>
                          <button className="text-green-400 hover:text-green-700">
                            <Copy className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="text-sm text-green-600">{generatedContent.seoTitle}</p>
                      </div>

                      {/* SHEQ Tags */}
                      <div className="bg-amber-50 rounded-lg p-4">
                        <div className="flex items-center mb-2">
                          <Shield className="h-4 w-4 mr-2 text-amber-700" />
                          <span className="text-sm font-medium text-amber-700">SHEQ Compliance Cross-Reference</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {generatedContent.sheqTags.map((tag, index) => (
                            <span key={index} className="px-2 py-1 bg-white text-xs text-amber-700 rounded border border-amber-200 flex items-center">
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <button className="flex-1 py-2.5 bg-[#002147] text-white text-sm font-medium rounded-lg hover:bg-[#003366] transition-colors flex items-center justify-center">
                          <Send className="h-4 w-4 mr-2" />
                          Publish to Website
                        </button>
                        <button className="px-4 py-2.5 border border-gray-200 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
                          <Download className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Active Projects */}
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-[#002147]">Active Projects</h2>
                    <Link href="/admin/projects" className="text-sm text-[#002147] hover:underline flex items-center">
                      View All
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </div>

                <div className="divide-y divide-gray-100">
                  {projects.map((project) => (
                    <div key={project.id} className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-medium text-gray-900">{project.name}</h3>
                          <p className="text-sm text-gray-500">{project.location} • {project.sector}</p>
                        </div>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(project.status)}`}>
                          {project.status === 'on-track' ? 'On Track' : project.status === 'attention' ? 'Attention' : 'At Risk'}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden mr-3">
                          <div
                            className="h-full bg-[#002147] rounded-full"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-600">{project.progress}%</span>
                      </div>
                      <div className="mt-2 flex items-center text-xs text-gray-500">
                        <HardHat className="h-3 w-3 mr-1" />
                        PM: {project.pm}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Updates */}
            <div className="mt-6 bg-white rounded-xl border border-gray-100 shadow-sm">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-[#002147]">Recent Content Updates</h2>
                  <Link href="/admin/content" className="text-sm text-[#002147] hover:underline flex items-center">
                    Manage Content
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>

              <div className="divide-y divide-gray-100">
                {recentUpdates.map((update) => (
                  <div key={update.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                          <ImageIcon className="h-6 w-6 text-gray-400" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{update.title}</h3>
                          <p className="text-sm text-gray-500 mt-1">{update.project}</p>
                          <div className="mt-2 flex items-center space-x-3">
                            <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                              update.status === 'published' ? 'bg-green-100 text-green-700' :
                              update.status === 'draft' ? 'bg-gray-100 text-gray-700' :
                              'bg-blue-100 text-blue-700'
                            }`}>
                              {update.status.charAt(0).toUpperCase() + update.status.slice(1)}
                            </span>
                            <span className="text-xs text-gray-400 flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {update.createdAt.toLocaleDateString('en-GB')}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-400 hover:text-[#002147] hover:bg-gray-100 rounded-lg">
                          <ClipboardCheck className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-[#002147] hover:bg-gray-100 rounded-lg">
                          <Linkedin className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
