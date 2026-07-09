import { createClient } from '@inmargin/client'

import type { Margin } from './margin'

export const marginClient = createClient<Margin>({ endpoint: '/api/margin' })
