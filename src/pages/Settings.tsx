import { useState } from "react";
import { Save, Bell, Shield, Palette, Database, Mail, Webhook, Key } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    notifications: {
      emailEnabled: true,
      smsEnabled: false,
      pushEnabled: true,
      digestFrequency: 'daily'
    },
    security: {
      twoFactorEnabled: false,
      sessionTimeout: '8',
      passwordExpiry: '90',
      apiKeyRotation: 'monthly'
    },
    general: {
      companyName: 'ServiceFlow Inc.',
      timezone: 'UTC-5',
      dateFormat: 'MM/DD/YYYY',
      language: 'en'
    },
    integrations: {
      emailProvider: 'smtp',
      webhookUrl: '',
      apiKey: '',
      databaseBackup: 'daily'
    }
  });

  const handleSave = (section: string) => {
    toast({
      title: "Settings Saved",
      description: `${section} settings have been updated successfully.`,
    });
  };

  const SettingCard = ({ title, description, children }: any) => (
    <Card className="glass-card p-6 mb-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-black">{title}</h3>
        {description && <p className="text-black/70 text-sm">{description}</p>}
      </div>
      {children}
    </Card>
  );

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Settings</h1>
          <p className="text-white/70">Configure your system preferences and integrations</p>
        </div>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-white/10 mb-8">
            <TabsTrigger value="general" className="text-black data-[state=active]:bg-primary">General</TabsTrigger>
            <TabsTrigger value="notifications" className="text-black data-[state=active]:bg-primary">Notifications</TabsTrigger>
            <TabsTrigger value="security" className="text-black data-[state=active]:bg-primary">Security</TabsTrigger>
            <TabsTrigger value="integrations" className="text-black data-[state=active]:bg-primary">Integrations</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <div className="space-y-6">
              <SettingCard
                title="Company Information"
                description="Basic company details and branding"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="companyName" className="text-black mb-2 block">Company Name</Label>
                    <Input
                      id="companyName"
                      value={settings.general.companyName}
                      onChange={(e) => setSettings({
                        ...settings,
                        general: { ...settings.general, companyName: e.target.value }
                      })}
                      className="bg-white/10 border-white/20 text-black"
                    />
                  </div>
                  <div>
                    <Label htmlFor="timezone" className="text-black mb-2 block">Timezone</Label>
                    <Select value={settings.general.timezone} onValueChange={(value) => 
                      setSettings({
                        ...settings,
                        general: { ...settings.general, timezone: value }
                      })
                    }>
                      <SelectTrigger className="bg-white/10 border-white/20 text-black">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="UTC-8">Pacific Time (UTC-8)</SelectItem>
                        <SelectItem value="UTC-7">Mountain Time (UTC-7)</SelectItem>
                        <SelectItem value="UTC-6">Central Time (UTC-6)</SelectItem>
                        <SelectItem value="UTC-5">Eastern Time (UTC-5)</SelectItem>
                        <SelectItem value="UTC+0">UTC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <Button onClick={() => handleSave('General')} className="btn-gradient">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </SettingCard>

              <SettingCard
                title="Appearance & Display"
                description="Customize the look and feel of your application"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="dateFormat" className="text-black mb-2 block">Date Format</Label>
                    <Select value={settings.general.dateFormat} onValueChange={(value) =>
                      setSettings({
                        ...settings,
                        general: { ...settings.general, dateFormat: value }
                      })
                    }>
                      <SelectTrigger className="bg-white/10 border-white/20 text-black">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                        <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                        <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="language" className="text-black mb-2 block">Language</Label>
                    <Select value={settings.general.language} onValueChange={(value) =>
                      setSettings({
                        ...settings,
                        general: { ...settings.general, language: value }
                      })
                    }>
                      <SelectTrigger className="bg-white/10 border-white/20 text-black">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </SettingCard>
            </div>
          </TabsContent>

          <TabsContent value="notifications">
            <div className="space-y-6">
              <SettingCard
                title="Notification Preferences"
                description="Control how and when you receive notifications"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-black font-medium">Email Notifications</p>
                        <p className="text-black/70 text-sm">Receive updates via email</p>
                      </div>
                    </div>
                    <Switch
                      checked={settings.notifications.emailEnabled}
                      onCheckedChange={(checked) =>
                        setSettings({
                          ...settings,
                          notifications: { ...settings.notifications, emailEnabled: checked }
                        })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Bell className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-black font-medium">Push Notifications</p>
                        <p className="text-black/70 text-sm">Browser push notifications</p>
                      </div>
                    </div>
                    <Switch
                      checked={settings.notifications.pushEnabled}
                      onCheckedChange={(checked) =>
                        setSettings({
                          ...settings,
                          notifications: { ...settings.notifications, pushEnabled: checked }
                        })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Bell className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-black font-medium">SMS Notifications</p>
                        <p className="text-black/70 text-sm">Critical alerts via SMS</p>
                      </div>
                    </div>
                    <Switch
                      checked={settings.notifications.smsEnabled}
                      onCheckedChange={(checked) =>
                        setSettings({
                          ...settings,
                          notifications: { ...settings.notifications, smsEnabled: checked }
                        })
                      }
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <Label className="text-black mb-2 block">Digest Frequency</Label>
                  <Select value={settings.notifications.digestFrequency} onValueChange={(value) =>
                    setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, digestFrequency: value }
                    })
                  }>
                    <SelectTrigger className="bg-white/10 border-white/20 text-black">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="realtime">Real-time</SelectItem>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-end mt-4">
                  <Button onClick={() => handleSave('Notification')} className="btn-gradient">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </SettingCard>
            </div>
          </TabsContent>

          <TabsContent value="security">
            <div className="space-y-6">
              <SettingCard
                title="Authentication & Security"
                description="Manage security settings and access controls"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-black font-medium">Two-Factor Authentication</p>
                        <p className="text-black/70 text-sm">Add extra security to your account</p>
                      </div>
                    </div>
                    <Switch
                      checked={settings.security.twoFactorEnabled}
                      onCheckedChange={(checked) =>
                        setSettings({
                          ...settings,
                          security: { ...settings.security, twoFactorEnabled: checked }
                        })
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div>
                    <Label htmlFor="sessionTimeout" className="text-black mb-2 block">Session Timeout (hours)</Label>
                    <Input
                      id="sessionTimeout"
                      type="number"
                      value={settings.security.sessionTimeout}
                      onChange={(e) => setSettings({
                        ...settings,
                        security: { ...settings.security, sessionTimeout: e.target.value }
                      })}
                      className="bg-white/10 border-white/20 text-black"
                    />
                  </div>
                  <div>
                    <Label htmlFor="passwordExpiry" className="text-black mb-2 block">Password Expiry (days)</Label>
                    <Input
                      id="passwordExpiry"
                      type="number"
                      value={settings.security.passwordExpiry}
                      onChange={(e) => setSettings({
                        ...settings,
                        security: { ...settings.security, passwordExpiry: e.target.value }
                      })}
                      className="bg-white/10 border-white/20 text-black"
                    />
                  </div>
                </div>

                <div className="flex justify-end mt-4">
                  <Button onClick={() => handleSave('Security')} className="btn-gradient">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </SettingCard>
            </div>
          </TabsContent>

          <TabsContent value="integrations">
            <div className="space-y-6">
              <SettingCard
                title="API & Webhooks"
                description="Configure external integrations and API settings"
              >
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="webhookUrl" className="text-black mb-2 block">Webhook URL</Label>
                    <Input
                      id="webhookUrl"
                      value={settings.integrations.webhookUrl}
                      onChange={(e) => setSettings({
                        ...settings,
                        integrations: { ...settings.integrations, webhookUrl: e.target.value }
                      })}
                      placeholder="https://your-app.com/webhook"
                      className="bg-white/10 border-white/20 text-black"
                    />
                  </div>

                  <div>
                    <Label htmlFor="apiKey" className="text-black mb-2 block">API Key</Label>
                    <div className="flex gap-2">
                      <Input
                        id="apiKey"
                        type="password"
                        value={settings.integrations.apiKey}
                        onChange={(e) => setSettings({
                          ...settings,
                          integrations: { ...settings.integrations, apiKey: e.target.value }
                        })}
                        placeholder="Enter your API key"
                        className="bg-white/10 border-white/20 text-black"
                      />
                      <Button variant="outline" className="border-white/30 text-black hover:bg-white/10">
                        <Key className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </SettingCard>

              <SettingCard
                title="Email Configuration"
                description="Configure email service settings"
              >
                <div className="space-y-4">
                  <div>
                    <Label className="text-black mb-2 block">Email Provider</Label>
                    <Select value={settings.integrations.emailProvider} onValueChange={(value) =>
                      setSettings({
                        ...settings,
                        integrations: { ...settings.integrations, emailProvider: value }
                      })
                    }>
                      <SelectTrigger className="bg-white/10 border-white/20 text-black">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="smtp">SMTP</SelectItem>
                        <SelectItem value="sendgrid">SendGrid</SelectItem>
                        <SelectItem value="mailgun">Mailgun</SelectItem>
                        <SelectItem value="aws-ses">AWS SES</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </SettingCard>

              <SettingCard
                title="Backup & Maintenance"
                description="Configure automated backup and maintenance schedules"
              >
                <div className="space-y-4">
                  <div>
                    <Label className="text-black mb-2 block">Database Backup Frequency</Label>
                    <Select value={settings.integrations.databaseBackup} onValueChange={(value) =>
                      setSettings({
                        ...settings,
                        integrations: { ...settings.integrations, databaseBackup: value }
                      })
                    }>
                      <SelectTrigger className="bg-white/10 border-white/20 text-black">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end mt-4">
                  <Button onClick={() => handleSave('Integration')} className="btn-gradient">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </SettingCard>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;
