/**
 * Icon Registry
 * 
 * Maps semantic icon names to Lucide components.
 * Using semantic names allows future icon set switching.
 * 
 * Naming conventions:
 * - Actions: add, remove, edit, delete, save, cancel, close, check
 * - Navigation: chevronUp/Down/Left/Right, arrowUp/Down/Left/Right
 * - UI: menu, search, filter, sort, settings, more (ellipsis)
 * - Status: info, warning, error, success
 * - Content: file, folder, image, link, code
 * - User: user, users, userPlus
 */

import {
  // Actions
  Plus,
  Minus,
  Pencil,
  Trash2,
  Save,
  X,
  Check,
  Copy,
  Download,
  Upload,
  Share,
  ExternalLink,
  RefreshCw,
  RotateCcw,
  Circle,
  Dot,
  
  // Media
  Play,
  Pause,
  SkipBack,
  SkipForward,

  // Navigation
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  
  // UI
  Menu,
  Search,
  Filter,
  SortAsc,
  SortDesc,
  Settings,
  MoreHorizontal,
  MoreVertical,
  // Canvas tools
  MousePointer2,
  Hand,
  Square,
  ArrowUpRight,
  Type,
  Bold,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Wrench,
  Group,
  Ungroup,
  Grip,
  GripVertical,
  Maximize2,
  Minimize2,
  PanelLeft,
  PanelRight,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  
  // Status
  Info,
  AlertTriangle,
  AlertCircle,
  CheckCircle,
  XCircle,
  Loader2,
  ShieldX,
  HelpCircle,
  
  // Content
  File,
  FileText,
  Folder,
  FolderOpen,
  Image,
  Link,
  Code,
  Terminal,
  Database,
  
  // User
  User,
  Users,
  UserPlus,
  LogOut,
  
  // Misc
  Moon,
  Sun,
  Palette,
  Layers,
  Compass,
  Target,
  Layout,
  Grid,
  List,
  Calendar,
  Clock,
  Tag,
  Hash,
  Bookmark,
  Star,
  Heart,
  MessageSquare,
  Send,
  Bell,
  Home,
  Inbox,
  Archive,
  Trash,
  
  // Version Control
  GitBranch,
  GitMerge,
  History,
  
  // Content Types
  BookOpen,
  Book,
  FileCode2,
  Network,
  Briefcase,
  SquarePen,
  Bot,
  Cog,
  Package,
  Component,
  StickyNote,
  Headphones,
  Building2,

  // Layout/Alignment
  AlignStartVertical,
  AlignCenterVertical,

  // Domain extras (ops-tickets)
  MapPin,
  Phone,
  PhoneOff,
  PhoneCall,
  Mail,
  Pill,
  Activity,

  type LucideIcon,
} from 'lucide-react';

export const iconRegistry = {
  // Actions
  add: Plus,
  remove: Minus,
  edit: Pencil,
  delete: Trash2,
  save: Save,
  close: X,
  check: Check,
  copy: Copy,
  download: Download,
  upload: Upload,
  share: Share,
  externalLink: ExternalLink,
  refresh: RefreshCw,
  undo: RotateCcw,
  circle: Circle,

  // Media
  play: Play,
  pause: Pause,
  skipBack: SkipBack,
  skipForward: SkipForward,
  dot: Dot,
  
  // Navigation
  chevronUp: ChevronUp,
  chevronDown: ChevronDown,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  chevronsUpDown: ChevronsUpDown,
  arrowUp: ArrowUp,
  arrowDown: ArrowDown,
  arrowLeft: ArrowLeft,
  arrowRight: ArrowRight,
  
  // UI
  menu: Menu,
  search: Search,
  filter: Filter,
  sortAsc: SortAsc,
  sortDesc: SortDesc,
  settings: Settings,
  more: MoreHorizontal,
  moreVertical: MoreVertical,
  // canvas tools: the cursor, the open hand, a shape, a line, a connector
  cursor: MousePointer2,
  hand: Hand,
  rectangle: Square,
  line: Minus,
  arrow: ArrowUpRight,
  // text: the T, and its styling
  text: Type,
  bold: Bold,
  alignLeft: AlignLeft,
  alignCenter: AlignCenter,
  alignRight: AlignRight,
  // the canvas's selection: the wrench (arrange), group, ungroup
  wrench: Wrench,
  group: Group,
  ungroup: Ungroup,
  grip: Grip,
  gripVertical: GripVertical,
  maximize: Maximize2,
  minimize: Minimize2,
  panelLeft: PanelLeft,
  panelRight: PanelRight,
  show: Eye,
  hide: EyeOff,
  lock: Lock,
  unlock: Unlock,
  
  // Status
  info: Info,
  warning: AlertTriangle,
  error: AlertCircle,
  success: CheckCircle,
  errorCircle: XCircle,
  loading: Loader2,
  accessDenied: ShieldX,
  help: HelpCircle,
  
  // Content
  file: File,
  fileText: FileText,
  folder: Folder,
  folderOpen: FolderOpen,
  image: Image,
  link: Link,
  code: Code,
  terminal: Terminal,
  database: Database,
  
  // User
  user: User,
  users: Users,
  userPlus: UserPlus,
  logout: LogOut,
  
  // Misc
  moon: Moon,
  sun: Sun,
  palette: Palette,
  layers: Layers,
  compass: Compass,
  target: Target,
  layout: Layout,
  grid: Grid,
  list: List,
  calendar: Calendar,
  clock: Clock,
  tag: Tag,
  hash: Hash,
  bookmark: Bookmark,
  star: Star,
  heart: Heart,
  message: MessageSquare,
  send: Send,
  bell: Bell,
  home: Home,
  inbox: Inbox,
  archive: Archive,
  trash: Trash,
  
  // Version Control
  gitBranch: GitBranch,
  gitMerge: GitMerge,
  history: History,
  
  // Content Types
  bookOpen: BookOpen,
  book: Book,
  fileCode: FileCode2,
  network: Network,
  briefcase: Briefcase,
  editSquare: SquarePen,
  bot: Bot,
  cog: Cog,
  package: Package,
  component: Component,
  stickyNote: StickyNote,
  headphones: Headphones,
  building: Building2,
  
  // Layout/Alignment
  alignStartVertical: AlignStartVertical,
  alignCenterVertical: AlignCenterVertical,

  // Domain extras
  mapPin: MapPin,
  phone: Phone,
  phoneOff: PhoneOff,
  phoneCall: PhoneCall,
  mail: Mail,
  pill: Pill,
  activity: Activity,
} as const satisfies Record<string, LucideIcon>;

export type IconRegistryKey = keyof typeof iconRegistry;
