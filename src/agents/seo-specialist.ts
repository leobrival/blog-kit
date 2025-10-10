import { BaseAgent, type AgentContext, type AgentResult } from './base-agent';

interface SEOMetrics {
  keywordDensity: Record<string, number>;
  headingStructure: { level: string; text: string; hasKeyword: boolean }[];
  metaDescriptionLength: number;
  titleLength: number;
  internalLinksCount: number;
  externalLinksCount: number;
  imageAltCount: number;
  readabilityScore?: number;
}

export class SEOSpecialistAgent extends BaseAgent {
  name = 'SEO Specialist';
  role = 'seo' as const;
  description = 'Comprehensive SEO optimization including keyword research, on-page SEO, technical SEO, and content optimization';

  async execute(context: AgentContext): Promise<AgentResult> {
    this.log('Starting SEO optimization...');

    const warnings: string[] = [];
    const recommendations: string[] = [];
    let updatedContent = context.articleContent;

    // Extract frontmatter
    const frontmatterMatch = updatedContent.match(/^---\n([\s\S]*?)\n---/);
    const frontmatter = frontmatterMatch ? frontmatterMatch[1] : '';
    const content = updatedContent.replace(/^---\n[\s\S]*?\n---\n/, '');

    // 1. Keyword Analysis
    const primaryKeyword = this.extractPrimaryKeyword(context);
    this.log(`Primary keyword: ${primaryKeyword}`);

    // 2. Check keyword density
    const keywordDensity = this.calculateKeywordDensity(content, primaryKeyword);
    if (keywordDensity < 1 || keywordDensity > 2) {
      warnings.push(`Keyword density is ${keywordDensity.toFixed(2)}% (optimal: 1-2%)`);
      recommendations.push('Adjust keyword usage to maintain natural density between 1-2%');
    }

    // 3. Optimize meta description
    const optimizedFrontmatter = this.optimizeMetaDescription(frontmatter, primaryKeyword);

    // 4. Check heading structure
    const headings = this.analyzeHeadingStructure(content, primaryKeyword);
    if (!headings.find(h => h.level === 'H1' && h.hasKeyword)) {
      warnings.push('H1 should contain primary keyword');
      recommendations.push(`Update H1 to include "${primaryKeyword}"`);
    }

    // 5. Add schema markup suggestion
    updatedContent = this.addSchemaMarkupComment(updatedContent);

    // 6. Check internal linking opportunities
    const internalLinks = this.countLinks(content, 'internal');
    if (internalLinks < 3) {
      recommendations.push('Add 3-5 internal links to related articles');
    }

    // 7. Image alt text check
    const images = this.findImages(content);
    if (images.withoutAlt > 0) {
      warnings.push(`${images.withoutAlt} images missing alt text`);
      recommendations.push('Add descriptive alt text to all images including keyword variations');
    }

    // 8. Add SEO checklist to content
    const seoChecklist = this.generateSEOChecklist(primaryKeyword);
    updatedContent = updatedContent.replace(
      '<!-- Infos supplémentaires -->',
      `<!-- SEO Checklist -->\n${seoChecklist}\n\n<!-- Infos supplémentaires -->`
    );

    // Replace frontmatter
    updatedContent = updatedContent.replace(
      /^---\n[\s\S]*?\n---/,
      `---\n${optimizedFrontmatter}\n---`
    );

    const metrics: SEOMetrics = {
      keywordDensity: { [primaryKeyword]: keywordDensity },
      headingStructure: headings,
      metaDescriptionLength: this.getMetaDescriptionLength(optimizedFrontmatter),
      titleLength: context.topic.length,
      internalLinksCount: internalLinks,
      externalLinksCount: this.countLinks(content, 'external'),
      imageAltCount: images.withAlt,
    };

    const summary = this.generateSummary(metrics, warnings, recommendations);

    this.log('SEO optimization complete');

    return {
      success: true,
      updatedContent,
      summary,
      metrics,
      warnings,
      recommendations,
    };
  }

  private extractPrimaryKeyword(context: AgentContext): string {
    // Extract from topic or spec
    const topic = context.topic.toLowerCase();
    // Simple extraction - in real implementation, use keyword research API
    const words = topic.split(' ').filter(w => w.length > 3);
    return words.slice(0, 3).join(' ');
  }

  private calculateKeywordDensity(content: string, keyword: string): number {
    const words = content.toLowerCase().split(/\s+/).length;
    const keywordCount = (content.toLowerCase().match(new RegExp(keyword.toLowerCase(), 'g')) || []).length;
    return (keywordCount / words) * 100;
  }

  private optimizeMetaDescription(frontmatter: string, keyword: string): string {
    let optimized = frontmatter;

    // Add SEO section if not exists
    if (!optimized.includes('seo:')) {
      const description = optimized.match(/description:\s*"([^"]+)"/)?.[1] || '';
      const metaDesc = description.length > 0 && description.length <= 160
        ? description
        : `${description.slice(0, 140)}...`;

      optimized += `\nseo:
  meta_description: "${metaDesc}"
  canonical: "https://blog.com/${this.slugify(keyword)}"
  og_title: "${keyword}"
  og_image: "/images/${this.slugify(keyword)}-cover.jpg"
  schema_type: "Article"`;
    }

    return optimized;
  }

  private analyzeHeadingStructure(content: string, keyword: string): SEOMetrics['headingStructure'] {
    const headingRegex = /^(#{1,6})\s+(.+)$/gm;
    const headings: SEOMetrics['headingStructure'] = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
      const level = `H${match[1].length}`;
      const text = match[2];
      const hasKeyword = text.toLowerCase().includes(keyword.toLowerCase());
      headings.push({ level, text, hasKeyword });
    }

    return headings;
  }

  private countLinks(content: string, type: 'internal' | 'external'): number {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    let count = 0;
    let match;

    while ((match = linkRegex.exec(content)) !== null) {
      const url = match[2];
      const isExternal = url.startsWith('http');
      if ((type === 'external' && isExternal) || (type === 'internal' && !isExternal)) {
        count++;
      }
    }

    return count;
  }

  private findImages(content: string): { withAlt: number; withoutAlt: number } {
    const imageRegex = /!\[([^\]]*)\]\([^)]+\)/g;
    let withAlt = 0;
    let withoutAlt = 0;
    let match;

    while ((match = imageRegex.exec(content)) !== null) {
      if (match[1].trim().length > 0) {
        withAlt++;
      } else {
        withoutAlt++;
      }
    }

    return { withAlt, withoutAlt };
  }

  private getMetaDescriptionLength(frontmatter: string): number {
    const match = frontmatter.match(/meta_description:\s*"([^"]+)"/);
    return match ? match[1].length : 0;
  }

  private addSchemaMarkupComment(content: string): string {
    const schemaComment = `
<!-- Schema.org Markup Recommendation -->
<!--
Add this JSON-LD schema before closing </head> tag:
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "{{title}}",
  "author": {
    "@type": "Person",
    "name": "{{author}}"
  },
  "datePublished": "{{published_at}}",
  "description": "{{meta_description}}"
}
</script>
-->
`;
    return content.replace('<!-- Infos supplémentaires -->', schemaComment + '\n<!-- Infos supplémentaires -->');
  }

  private generateSEOChecklist(keyword: string): string {
    return `<!--
## SEO Optimization Checklist

### On-Page SEO
- [ ] Primary keyword "${keyword}" in H1
- [ ] Keyword in first 100 words
- [ ] Keyword density 1-2%
- [ ] Meta description 150-160 characters with keyword
- [ ] Title tag optimized (50-60 characters)
- [ ] URL slug keyword-rich
- [ ] H2/H3 include keyword variations
- [ ] LSI keywords used naturally

### Technical SEO
- [ ] Schema.org markup added (Article type)
- [ ] All images have descriptive alt text
- [ ] Internal links (3-5 minimum)
- [ ] External authoritative links (3-5 minimum)
- [ ] Mobile-responsive design
- [ ] Page load time < 3 seconds
- [ ] HTTPS enabled
- [ ] No broken links

### Content Quality
- [ ] Content matches search intent
- [ ] Comprehensive coverage (1500+ words)
- [ ] Clear heading hierarchy (H1 → H2 → H3)
- [ ] Short paragraphs (< 5 lines)
- [ ] Scannable formatting (bullets, lists)
- [ ] E-E-A-T demonstrated
- [ ] Fresh, updated content

### Link Building
- [ ] Linkable assets created
- [ ] Shareable content format
- [ ] Outreach plan for backlinks
- [ ] Social sharing optimized

### Performance Metrics to Track
- Keyword rankings (target: top 10)
- Organic traffic
- Click-through rate from SERP
- Bounce rate (target: < 50%)
- Average time on page (target: > 2 min)
- Core Web Vitals passing
-->`;
  }

  private generateSummary(
    metrics: SEOMetrics,
    warnings: string[],
    recommendations: string[]
  ): string {
    const parts = [
      '✅ SEO Optimization Complete',
      '',
      '**Metrics:**',
      `- Keyword density: ${Object.values(metrics.keywordDensity)[0]?.toFixed(2) || 0}%`,
      `- Headings: ${metrics.headingStructure.length} (${metrics.headingStructure.filter(h => h.hasKeyword).length} with keyword)`,
      `- Meta description: ${metrics.metaDescriptionLength} characters`,
      `- Internal links: ${metrics.internalLinksCount}`,
      `- External links: ${metrics.externalLinksCount}`,
      `- Images with alt: ${metrics.imageAltCount}`,
    ];

    if (warnings.length > 0) {
      parts.push('', '**Warnings:**', ...warnings.map(w => `- ⚠️  ${w}`));
    }

    if (recommendations.length > 0) {
      parts.push('', '**Recommendations:**', ...recommendations.map(r => `- 💡 ${r}`));
    }

    return parts.join('\n');
  }

  private slugify(text: string): string {
    return text
      .toLowerCase()
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
}
