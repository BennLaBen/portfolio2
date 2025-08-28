import createMiddleware from 'next-intl/middleware';
import { i18nRouting } from './lib/i18n';

export default createMiddleware(i18nRouting);

// Désactivé pour le lancement local (pas de réécriture de locale)
export const config = { matcher: [] };

