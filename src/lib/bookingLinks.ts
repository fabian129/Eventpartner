/**
 * Cal.com booking links — single source of truth.
 * Provided by the client (Joakim's mails, May–June 2026). All verified live.
 *
 *  - team:  EventPartner's general 15-min link. NOTE: currently backed by
 *           Malin's calendar (confirmed via the mail-thread HTML).
 *  - malin: Malin's personal calendar.
 *  - vpp:   Pontus's video-brochure (Video Plus Print) booking link.
 *  - Pontus has NOT created a personal cal.com link yet — when he does,
 *    repoint the surface(s) that should be his below.
 */
export const BOOKING_LINKS = {
  team: 'https://cal.com/eventpartner/15min',
  malin: 'https://cal.com/malin-berlin-eventpartner',
  vpp: 'https://www.cal.eu/premium-videobrochures',

  // Per-surface assignments (swap to a personal link per surface when decided):
  vip: 'https://cal.com/eventpartner/15min',
  aiAssistant: 'https://cal.com/eventpartner/15min',
  requestForm: 'https://cal.com/eventpartner/15min',
};
