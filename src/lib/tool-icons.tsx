import {
  AppWindow,
  ArrowLeftRight,
  Binary,
  Braces,
  Clock3,
  FileCode2,
  FileJson2,
  Globe,
  Hash,
  Image,
  KeyRound,
  Link2,
  List,
  Palette,
  QrCode,
  ScanSearch,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
  Type,
  Wand2,
  Wrench,
} from 'lucide-react';
import { type ToolCategory, type ToolMeta } from './registry';

const ICON_MAP = {
  braces: Braces,
  wrench: Wrench,
  code: FileCode2,
  'file-json': FileJson2,
  'arrow-left-right': ArrowLeftRight,
  binary: Binary,
  palette: Palette,
  shield: ShieldCheck,
  clock: Clock3,
  search: SearchCheck,
  diff: AppWindow,
  qr: QrCode,
  hash: Hash,
  wand: Wand2,
  image: Image,
  link: Link2,
  type: Type,
  globe: Globe,
  terminal: TerminalSquare,
  key: KeyRound,
  scan: ScanSearch,
  'file-code': FileCode2,
  list: List,
  sparkles: Sparkles,
} as const;

const CATEGORY_ICON_MAP: Record<ToolCategory, keyof typeof ICON_MAP> = {
  format: 'braces',
  converters: 'arrow-left-right',
  inspect: 'search',
  generators: 'sparkles',
  encoders: 'shield',
};

export function renderToolIcon(tool: ToolMeta) {
  const key = tool.icon ?? CATEGORY_ICON_MAP[tool.category];
  const Icon = ICON_MAP[key];
  return <Icon className="h-4 w-4" />;
}
