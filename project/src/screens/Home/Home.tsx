import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { QRScanner } from "../../components/QRScanner";
import { 
  CheckSquareIcon, 
  PlusIcon, 
  TrashIcon, 
  CheckIcon,
  UserIcon,
  LogOutIcon,
  XIcon,
  CalendarIcon,
  ClockIcon,
  QrCodeIcon
} from "lucide-react";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export const Home = (): JSX.Element => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: "Complete project proposal", completed: false },
    { id: 2, text: "Review team feedback", completed: true },
    { id: 3, text: "Schedule client meeting", completed: false },
  ]);
  const [newTask, setNewTask] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  // Get user data from localStorage
  const userData = JSON.parse(localStorage.getItem('userData') || '{"name": "User", "email": "user@example.com", "joinDate": "Today"}');

  // Update date and time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim()) {
      setTasks([...tasks, {
        id: Date.now(),
        text: newTask.trim(),
        completed: false
      }]);
      setNewTask("");
    }
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleQRScan = (data: string) => {
    // Try to parse the QR data as a task
    let taskText = data;
    
    // If it's a URL, extract the meaningful part
    if (data.startsWith('http')) {
      try {
        const url = new URL(data);
        taskText = `Visit: ${url.hostname}${url.pathname}`;
      } catch {
        taskText = `Visit: ${data}`;
      }
    }
    
    // If it's JSON, try to extract task info
    try {
      const parsed = JSON.parse(data);
      if (parsed.task) {
        taskText = parsed.task;
      } else if (parsed.title) {
        taskText = parsed.title;
      } else if (parsed.text) {
        taskText = parsed.text;
      }
    } catch {
      // Not JSON, use as is
    }
    
    // Add the task
    setTasks([...tasks, {
      id: Date.now(),
      text: taskText,
      completed: false
    }]);
    
    setShowScanner(false);
  };

  const completedCount = tasks.filter(task => task.completed).length;
  const totalCount = tasks.length;

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem('userData');
    setShowLogoutConfirm(false);
    navigate("/login");
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-25 to-indigo-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CheckSquareIcon className="w-8 h-8 text-[#df8e8f]" />
            <h1 className="text-2xl font-semibold text-gray-800">DoTask</h1>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowProfile(true)}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
            >
              <UserIcon className="w-4 h-4" />
              <span>Profile</span>
            </button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLogout}
              className="text-gray-600 hover:text-gray-800"
            >
              <LogOutIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Date and Time Card */}
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CalendarIcon className="w-6 h-6 text-[#df8e8f]" />
                <div>
                  <div className="text-lg font-semibold text-gray-800">
                    {formatDate(currentDateTime)}
                  </div>
                  <div className="text-sm text-gray-600">Today's Date</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <ClockIcon className="w-6 h-6 text-[#df8e8f]" />
                <div className="text-right">
                  <div className="text-lg font-semibold text-gray-800 font-mono">
                    {formatTime(currentDateTime)}
                  </div>
                  <div className="text-sm text-gray-600">Current Time</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Card */}
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-[#df8e8f]">{totalCount}</div>
                <div className="text-sm text-gray-600">Total Tasks</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-500">{completedCount}</div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-500">{totalCount - completedCount}</div>
                <div className="text-sm text-gray-600">Pending</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Add Task Card */}
        <Card className="bg-gradient-to-r from-[#df8e8f] to-[#e8a5a6] border-0 shadow-lg overflow-hidden">
          <CardContent className="p-0">
            <div className="p-6 text-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <PlusIcon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-semibold">Create New Task</h3>
              </div>
              
              <form onSubmit={addTask} className="space-y-4">
                <div className="relative">
                  <Input
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="What would you like to accomplish today?"
                    className="w-full h-14 bg-white/95 border-0 text-gray-800 placeholder-gray-500 text-lg rounded-xl shadow-sm focus:ring-2 focus:ring-white/50 focus:bg-white"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-2">
                    <button
                      type="button"
                      onClick={() => setShowScanner(true)}
                      className="w-8 h-8 bg-purple-500 hover:bg-purple-600 rounded-lg flex items-center justify-center text-white transition-all hover:scale-105 active:scale-95"
                      title="Scan QR Code"
                    >
                      <QrCodeIcon className="w-4 h-4" />
                    </button>
                    <button
                      type="submit"
                      disabled={!newTask.trim()}
                      className="w-8 h-8 bg-white/20 hover:bg-white/30 disabled:bg-white/10 disabled:cursor-not-allowed rounded-lg flex items-center justify-center text-white transition-all hover:scale-105 active:scale-95 disabled:scale-100"
                     title={newTask.trim() ? "Add Task" : "Enter a task first"}
                    >
                      <PlusIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const taskText = "Buy groceries";
                      setTasks(prev => [...prev, {
                        id: Date.now(),
                        text: taskText,
                        completed: false
                      }]);
                    }}
                    className="px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-full text-sm text-white transition-all hover:scale-105 active:scale-95"
                  >
                    🛒 Buy groceries
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const taskText = "Call mom";
                      setTasks(prev => [...prev, {
                        id: Date.now(),
                        text: taskText,
                        completed: false
                      }]);
                    }}
                    className="px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-full text-sm text-white transition-all hover:scale-105 active:scale-95"
                  >
                    📞 Call mom
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const taskText = "Exercise for 30 minutes";
                      setTasks(prev => [...prev, {
                        id: Date.now(),
                        text: taskText,
                        completed: false
                      }]);
                    }}
                    className="px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-full text-sm text-white transition-all hover:scale-105 active:scale-95"
                  >
                    💪 Exercise
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const taskText = "Read a book";
                      setTasks(prev => [...prev, {
                        id: Date.now(),
                        text: taskText,
                        completed: false
                      }]);
                    }}
                    className="px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-full text-sm text-white transition-all hover:scale-105 active:scale-95"
                  >
                    📚 Read a book
                  </button>
                </div>
              </form>
            </div>
            
            <div className="h-1 bg-gradient-to-r from-white/30 via-white/10 to-white/30"></div>
          </CardContent>
        </Card>

        {/* Tasks List */}
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-800">Your Tasks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {tasks.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <CheckSquareIcon className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>No tasks yet. Add one above to get started!</p>
              </div>
            ) : (
              tasks.map((task) => (
                <div
                  key={task.id}
                  className={`flex items-center gap-3 p-4 rounded-lg border transition-all ${
                    task.completed
                      ? "bg-green-50 border-green-200"
                      : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  <button
                    onClick={() => toggleTask(task.id)}
                    className={`flex items-center justify-center w-6 h-6 rounded-full border-2 transition-colors ${
                      task.completed
                        ? "bg-green-500 border-green-500 text-white"
                        : "border-gray-300 hover:border-[#df8e8f]"
                    }`}
                  >
                    {task.completed && <CheckIcon className="w-4 h-4" />}
                  </button>
                  <span
                    className={`flex-1 ${
                      task.completed
                        ? "text-green-700 line-through"
                        : "text-gray-800"
                    }`}
                  >
                    {task.text}
                  </span>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      {/* Profile Modal */}
      {showProfile && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md bg-white shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl font-semibold text-gray-800">Profile</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowProfile(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XIcon className="w-5 h-5" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-20 h-20 bg-gradient-to-br from-[#df8e8f] to-[#c97a7b] rounded-full flex items-center justify-center">
                  <UserIcon className="w-10 h-10 text-white" />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-800">{userData.name}</h3>
                  <p className="text-gray-600">{userData.email}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-2">Account Information</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Member since:</span>
                      <span>{userData.joinDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total tasks:</span>
                      <span>{totalCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Completed tasks:</span>
                      <span>{completedCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Success rate:</span>
                      <span>{totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0}%</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    onClick={() => setShowProfile(false)}
                    className="flex-1 bg-[#df8e8f] hover:bg-[#c97a7b] text-white"
                  >
                    Close
                  </Button>
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* QR Scanner Modal */}
      {showScanner && (
        <QRScanner
          onScan={handleQRScan}
          onClose={() => setShowScanner(false)}
        />
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-sm bg-white shadow-2xl">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-xl font-semibold text-gray-800 flex items-center justify-center gap-2">
                <LogOutIcon className="w-6 h-6 text-red-500" />
                Confirm Logout
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <p className="text-gray-600 mb-4">
                  Are you sure you want to logout? Your tasks will be saved locally.
                </p>
              </div>
              
              <div className="flex gap-3">
                <Button
                  onClick={cancelLogout}
                  variant="outline"
                  className="flex-1 border-gray-200 text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </Button>
                <Button
                  onClick={confirmLogout}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white"
                >
                  Logout
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};