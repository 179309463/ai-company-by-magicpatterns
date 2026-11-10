/**
 * 旁白脚本。start / end 单位为秒（end 是这句允许占用的最晚时间）。
 * scripts/generate-voice.mjs 会读取两个标记之间的 JSON，逐句生成 public/voice/<id>.mp3，
 * 并在语音超出时自动加快语速，保证不与下一句重叠。
 * 修改文案后请重新运行 `npm run voice`。
 */
export type NarrationLine = { id: string; start: number; end: number; text: string };

export const NARRATION: NarrationLine[] =
/* NARRATION_START */
[
  { "id": "intro-1", "start": 0.6, "end": 7.0, "text": "ChatGPT 问世不过几年，人工智能已经深刻改变了我们的世界。" },
  { "id": "intro-2", "start": 7.2, "end": 13.6, "text": "今天用三分钟，带你认识站在浪潮最前沿的五家 AI 巨头。" },

  { "id": "anthropic-1", "start": 14.8, "end": 22.5, "text": "第一家，Anthropic。2021年，一群来自 OpenAI 的研究者出走，创立了这家公司。" },
  { "id": "anthropic-2", "start": 22.8, "end": 30.5, "text": "创始人达里奥和丹妮拉·阿莫迪兄妹，把 AI 安全写进了公司的基因。" },
  { "id": "anthropic-3", "start": 30.8, "end": 37.5, "text": "他们打造的 Claude 系列模型，以严谨的推理和出色的编程能力著称。" },
  { "id": "anthropic-4", "start": 37.8, "end": 45.5, "text": "从宪法式 AI 到 Claude Code，Anthropic 想证明：安全与强大，可以兼得。" },

  { "id": "openai-1", "start": 46.8, "end": 53.7, "text": "第二家，OpenAI。2015年成立于旧金山，最初是一家非营利研究机构。" },
  { "id": "openai-2", "start": 54.0, "end": 62.0, "text": "2022年11月，ChatGPT 横空出世，两个月用户破亿，引爆全球生成式 AI 热潮。" },
  { "id": "openai-3", "start": 62.3, "end": 68.8, "text": "从 GPT-4 到推理模型 o 系列，从图像模型到视频模型 Sora，" },
  { "id": "openai-4", "start": 69.0, "end": 77.3, "text": "在萨姆·奥特曼的带领下，OpenAI 几乎定义了大众心中的 AI。" },

  { "id": "x-1", "start": 78.8, "end": 85.5, "text": "第三家，马斯克的 xAI。2023年成立，如今已与社交平台 X 合并。" },
  { "id": "x-2", "start": 85.8, "end": 92.7, "text": "它的模型叫 Grok，直接接入 X 的实时信息流，回答风格大胆直接。" },
  { "id": "x-3", "start": 93.0, "end": 99.5, "text": "在孟菲斯，xAI 用极短的时间建起了超级计算集群 Colossus，" },
  { "id": "x-4", "start": 99.8, "end": 107.3, "text": "以惊人的速度和算力，向第一梯队发起冲锋。" },

  { "id": "meta-1", "start": 108.8, "end": 115.7, "text": "第四家，Meta。早在2013年，它就成立了 FAIR 人工智能实验室，" },
  { "id": "meta-2", "start": 116.0, "end": 124.5, "text": "由图灵奖得主杨立昆领衔，还贡献了最流行的深度学习框架之一 PyTorch。" },
  { "id": "meta-3", "start": 124.8, "end": 132.5, "text": "2023年起，Meta 陆续开放 Llama 系列模型权重，掀起开源大模型浪潮。" },
  { "id": "meta-4", "start": 132.8, "end": 139.4, "text": "如今，Meta AI 已走进旗下的社交应用，触达数十亿用户。" },

  { "id": "google-1", "start": 140.8, "end": 148.0, "text": "第五家，谷歌。2017年，谷歌研究者发表论文《Attention Is All You Need》，" },
  { "id": "google-2", "start": 148.3, "end": 154.5, "text": "提出了 Transformer 架构，这是今天几乎所有大模型的基石。" },
  { "id": "google-3", "start": 154.8, "end": 163.0, "text": "旗下的 DeepMind 打造了 AlphaGo 与 AlphaFold，后者更助力团队摘得诺贝尔化学奖。" },
  { "id": "google-4", "start": 163.3, "end": 171.4, "text": "如今，谷歌凭借 Gemini 模型和自研 TPU 芯片，全面重回 AI 竞赛中心。" },

  { "id": "outro-1", "start": 172.6, "end": 178.8, "text": "安全、普及、速度、开源、底层创新。五家公司，五条路径。" },
  { "id": "outro-2", "start": 179.0, "end": 183.6, "text": "AI 的下一个十年，谁会领跑？关注我，持续追踪。" }
]
/* NARRATION_END */
;
