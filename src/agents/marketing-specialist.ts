import { BaseAgent, type AgentContext, type AgentResult } from './base-agent';

interface MarketingMetrics {
  ctasAdded: number;
  socialPostsGenerated: number;
  emailTemplateCreated: boolean;
  conversionOptimizations: number;
}

interface CTA {
  type: 'soft' | 'medium' | 'strong';
  position: 'above-fold' | 'mid-content' | 'bottom';
  text: string;
  action: string;
}

interface SocialPost {
  platform: 'twitter' | 'linkedin' | 'facebook' | 'mastodon';
  content: string;
  hashtags?: string[];
  characterCount: number;
}

export class MarketingSpecialistAgent extends BaseAgent {
  name = 'Marketing Specialist';
  role = 'marketing' as const;
  description = 'Comprehensive digital marketing including content marketing, social media, email campaigns, and conversion optimization';

  async execute(context: AgentContext): Promise<AgentResult> {
    this.log('Starting marketing optimization...');

    const warnings: string[] = [];
    const recommendations: string[] = [];
    let updatedContent = context.articleContent;

    // 1. Generate and insert CTAs
    const ctas = this.generateCTAs(context);
    updatedContent = this.insertCTAs(updatedContent, ctas);
    this.log(`Added ${ctas.length} strategic CTAs`);

    // 2. Generate social media posts
    const socialPosts = this.generateSocialPosts(context);
    this.log(`Generated ${socialPosts.length} social media posts`);

    // 3. Create email newsletter template
    const emailTemplate = this.generateEmailTemplate(context);
    this.log('Created email newsletter template');

    // 4. Add conversion optimization elements
    const conversions = this.addConversionOptimizations(updatedContent);
    updatedContent = conversions.content;

    // 5. Add marketing assets section
    updatedContent = this.addMarketingAssets(updatedContent, socialPosts, emailTemplate);

    // 6. Add analytics tracking suggestions
    updatedContent = this.addAnalyticsTracking(updatedContent);

    // 7. Validate CTA placement
    if (ctas.length < 3) {
      warnings.push('Minimum 3 CTAs recommended for optimal conversion');
    }

    // 8. Check for above-fold CTA
    if (!ctas.find(c => c.position === 'above-fold')) {
      recommendations.push('Add a soft CTA above the fold (newsletter signup, guide download)');
    }

    const metrics: MarketingMetrics = {
      ctasAdded: ctas.length,
      socialPostsGenerated: socialPosts.length,
      emailTemplateCreated: true,
      conversionOptimizations: conversions.count,
    };

    const summary = this.generateSummary(metrics, warnings, recommendations);

    this.log('Marketing optimization complete');

    return {
      success: true,
      updatedContent,
      summary,
      metrics,
      warnings,
      recommendations,
    };
  }

  private generateCTAs(context: AgentContext): CTA[] {
    const ctas: CTA[] = [];

    // Soft CTA - Above fold / mid-content
    ctas.push({
      type: 'soft',
      position: 'above-fold',
      text: '💡 Astuce',
      action: 'Téléchargez notre template complet pour démarrer en 5 minutes.\n[Télécharger le template gratuit →](#)',
    });

    // Medium CTA - Mid content
    ctas.push({
      type: 'medium',
      position: 'mid-content',
      text: '## Prêt à aller plus loin?',
      action: 'Rejoignez 2,000+ développeurs qui reçoivent nos tutoriels avancés chaque semaine.\n\n[S\'inscrire à la newsletter →](#)',
    });

    // Strong CTA - Bottom
    ctas.push({
      type: 'strong',
      position: 'bottom',
      text: '**Besoin d\'aide pour implémenter?**',
      action: 'Notre équipe propose des audits techniques et accompagnement personnalisé.\n\n[Réserver une consultation gratuite →](#)',
    });

    return ctas;
  }

  private insertCTAs(content: string, ctas: CTA[]): string {
    let updated = content;

    // Insert above-fold CTA after introduction
    const aboveFoldCTA = ctas.find(c => c.position === 'above-fold');
    if (aboveFoldCTA) {
      const ctaBlock = `\n\n> ${aboveFoldCTA.text}: ${aboveFoldCTA.action}\n\n`;
      updated = updated.replace(
        /## Introduction\n([\s\S]*?)(?=\n## )/,
        (match) => match + ctaBlock
      );
    }

    // Insert mid-content CTA
    const midCTA = ctas.find(c => c.position === 'mid-content');
    if (midCTA) {
      const ctaBlock = `\n\n---\n\n${midCTA.text}\n\n${midCTA.action}\n\n---\n\n`;
      // Insert before FAQ section
      updated = updated.replace('## FAQ', ctaBlock + '## FAQ');
    }

    // Insert bottom CTA
    const bottomCTA = ctas.find(c => c.position === 'bottom');
    if (bottomCTA) {
      const ctaBlock = `\n\n---\n\n${bottomCTA.text}\n${bottomCTA.action}\n\n`;
      updated = updated.replace(
        '## Sources externes',
        ctaBlock + '## Sources externes'
      );
    }

    return updated;
  }

  private generateSocialPosts(context: AgentContext): SocialPost[] {
    const posts: SocialPost[] = [];
    const topic = context.topic;

    // Twitter/X post
    posts.push({
      platform: 'twitter',
      content: `🚀 Nouveau: ${topic}

✅ Setup en 30 min
✅ TypeScript strict
✅ Code complet

[LINK]

#typescript #webdev #productivity`,
      hashtags: ['typescript', 'webdev', 'productivity'],
      characterCount: 150,
    });

    // LinkedIn post
    const linkedInContent = `Comment j'ai créé ${topic.toLowerCase()}

Après plusieurs semaines de développement, voici ce que j'ai appris:

🔹 L'importance d'une architecture propre
🔹 TypeScript strict pour éviter les bugs
🔹 Tests automatisés dès le départ
🔹 Documentation as code

Le résultat? Une solution production-ready en 30 jours.

Lire l'article complet avec code source: [LINK]

#développement #typescript #bestpractices`;

    posts.push({
      platform: 'linkedin',
      content: linkedInContent,
      hashtags: ['développement', 'typescript', 'bestpractices'],
      characterCount: linkedInContent.length,
    });

    // Mastodon/Bluesky post
    posts.push({
      platform: 'mastodon',
      content: `🔧 Nouveau guide: ${topic}

Guide complet avec exemples de code, architecture, et best practices.

Parfait pour démarrer rapidement sans passer par la phase d'essais-erreurs.

[LINK]

#dev #coding #tutorial`,
      hashtags: ['dev', 'coding', 'tutorial'],
      characterCount: 200,
    });

    return posts;
  }

  private generateEmailTemplate(context: AgentContext): string {
    return `
**Subject**: 📝 Nouveau: ${context.topic}

**Preheader**: Guide complet avec code et pièges à éviter

---

Bonjour [Prénom],

J'ai publié un nouveau guide qui devrait vous intéresser:

## ${context.topic}

**Ce que vous allez apprendre:**

✓ Setup complet étape par étape
✓ Architecture recommandée
✓ Best practices TypeScript
✓ Pièges courants à éviter
✓ Code source complet

**Temps de lecture**: 15 minutes
**Niveau**: Intermédiaire

[Lire l'article →](#)

---

**Besoin d'aide?**

Répondez à cet email si vous avez des questions. Je lis et réponds personnellement à tous les messages.

À bientôt,
[Signature]

---

*Vous recevez cet email car vous êtes inscrit à notre newsletter. [Se désinscrire](#)*
`;
  }

  private addConversionOptimizations(content: string): { content: string; count: number } {
    let updated = content;
    let count = 0;

    // Add urgency
    const urgencyNote = `
> **💎 Offre limitée**: Les 100 premiers lecteurs peuvent réserver un audit gratuit. [Profiter de l'offre →](#)
`;
    updated = updated.replace('## À éviter', urgencyNote + '\n## À éviter');
    count++;

    // Add social proof
    const socialProof = `
> **⭐ Témoignage**: "Ce guide m'a fait gagner 2 semaines de développement" - Marc, Lead Dev @Startup
`;
    updated = updated.replace('## Résumé exécutif', '## Résumé exécutif' + '\n\n' + socialProof);
    count++;

    // Add trust badge
    const trustBadge = `
> **✅ Garantie qualité**: Testé en production par 50+ équipes depuis 6 mois
`;
    updated = updated.replace('## Tutoriel', trustBadge + '\n\n## Tutoriel');
    count++;

    return { content: updated, count };
  }

  private addMarketingAssets(content: string, socialPosts: SocialPost[], emailTemplate: string): string {
    const marketingSection = `
<!-- Marketing Assets -->
<!--
## Distribution Strategy

### Social Media Posts

**Twitter/X:**
${socialPosts.find(p => p.platform === 'twitter')?.content || ''}

**LinkedIn:**
${socialPosts.find(p => p.platform === 'linkedin')?.content || ''}

**Mastodon/Bluesky:**
${socialPosts.find(p => p.platform === 'mastodon')?.content || ''}

### Email Newsletter Template
${emailTemplate}

### Distribution Schedule
- J+0: Publication blog + Twitter
- J+0 (+2h): LinkedIn post
- J+1: Newsletter envoi (segment développeurs)
- J+7: Republication Medium/Dev.to (canonical link)
- J+14: LinkedIn re-share avec nouvelle accroche
- J+30: Update contenu + re-promotion

### Analytics Goals
- Page views: 500+ (30 jours)
- Avg. time on page: >2 min
- CTA click rate: >5%
- Newsletter signups: 20+
- Social shares: 50+
-->
`;

    return content.replace('<!-- Infos supplémentaires -->', marketingSection + '\n<!-- Infos supplémentaires -->');
  }

  private addAnalyticsTracking(content: string): string {
    const analyticsSection = `
<!-- Analytics Tracking Setup -->
<!--
## Events to Track (Plausible/GA4)

### Page Events
- event: 'article_view'
  props: { article_slug, category, author }

- event: 'scroll_depth'
  props: { depth: '25%' | '50%' | '75%' | '100%' }

### CTA Events
- event: 'cta_click'
  props: { cta_type: 'newsletter' | 'consultation' | 'download', position: 'above-fold' | 'mid-content' | 'bottom' }

### Engagement Events
- event: 'time_on_page'
  props: { duration_seconds }

- event: 'external_link_click'
  props: { destination, type: 'source' | 'tool' | 'example' }

### Conversion Goals
✓ Goal 1: Article read >30s
✓ Goal 2: Scroll >50%
✓ Goal 3: CTA click
✓ Goal 4: Newsletter signup
✓ Goal 5: External resource click

## UTM Parameters for Distribution
- Twitter: ?utm_source=twitter&utm_medium=social&utm_campaign=article_launch
- LinkedIn: ?utm_source=linkedin&utm_medium=social&utm_campaign=article_launch
- Newsletter: ?utm_source=newsletter&utm_medium=email&utm_campaign=weekly_digest
- Medium: ?utm_source=medium&utm_medium=syndication&utm_campaign=article_repost
-->
`;

    return content.replace('<!-- Infos supplémentaires -->', analyticsSection + '\n<!-- Infos supplémentaires -->');
  }

  private generateSummary(
    metrics: MarketingMetrics,
    warnings: string[],
    recommendations: string[]
  ): string {
    const parts = [
      '✅ Marketing Optimization Complete',
      '',
      '**Metrics:**',
      `- CTAs added: ${metrics.ctasAdded}`,
      `- Social posts generated: ${metrics.socialPostsGenerated}`,
      `- Email template: ${metrics.emailTemplateCreated ? 'Created' : 'Not created'}`,
      `- Conversion optimizations: ${metrics.conversionOptimizations}`,
    ];

    if (warnings.length > 0) {
      parts.push('', '**Warnings:**', ...warnings.map(w => `- ⚠️  ${w}`));
    }

    if (recommendations.length > 0) {
      parts.push('', '**Recommendations:**', ...recommendations.map(r => `- 💡 ${r}`));
    }

    parts.push(
      '',
      '**Next Steps:**',
      '1. Review and customize CTAs for your brand',
      '2. Schedule social media posts',
      '3. Set up email campaign',
      '4. Configure analytics tracking',
      '5. Monitor performance for 7 days',
      '6. Iterate based on engagement data'
    );

    return parts.join('\n');
  }
}
