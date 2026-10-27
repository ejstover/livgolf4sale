/* Presence is an editorial classification, never live activity. All messages are fiction. */
window.LIV_DATA = (() => {
  const checked = '2026-10-26';
  const sources = {
    decisions: { label: 'Golf Channel · Oct 26, 2026', date: '2026-10-26', url: 'https://www.golfchannel.com/news/news/liv-players-not-returning-in-2027' },
    exits: { label: 'Golf Digest · departure tracker', date: '2026-10-26', url: 'https://www.golfdigest.com/story/players-who-have-left-liv-golf-jon-rahm-bryson-dechambeau-phil-mickelson' },
    uncertain: { label: 'GolfMagic · Oct 26, 2026', date: '2026-10-26', url: 'https://www.golfmagic.com/tour/liv-golf/liv-golf-20-which-players-are-staying-leaving-or-undecided' },
    bryson: { label: 'Golf Monthly · Oct 22, 2026', date: '2026-10-22', url: 'https://www.golfmonthly.com/news/bryson-dechambeau-confirms-dp-world-tour-start-but-still-committed-to-liv-golf-2-0' },
    roster: { label: 'LIV Golf · season roster', date: null, url: 'https://www.livgolf.com/teams' }
  };
  const players = [];
  const add = (name, presence, screenName, message, note, refs) => players.push({
    id: name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-$/, ''),
    name, presence, screenName, message, note, sources: refs.map(key => sources[key]), checked
  });
  const online = [
    ['Ben Campbell', 'BenThereStillHere', 'moved u below my cousin on the buddy list. hope the tour card was worth it.'],
    ['Brendan Steele', 'SteeleMyHeart', 'u said forever. apparently that meant until abu dhabi.'],
    ['Cameron Tringale', 'TringaleTears', 'matching polos. matching dreams. apparently only i kept both.'],
    ['Richard Bland', 'xX_BlandButLoyal_Xx', 'cool. guess “team golf” was just my screen name.'],
    ['Victor Perez', 'xX_VictorNotVictim_Xx', 'please stop calling it a global family if everyone keeps transferring schools.']
  ];
  online.forEach(([name, handle, message]) => add(name, 'online', handle, message, 'Publicly expressed an intention to stay for LIV 2.0. This is not confirmation of a signed contract.', ['decisions']));
  const offline = [
    ['Abraham Ancer', 'AncerMeNever', 'new tour. who dis.'],
    ['Adrian Meronk', 'AdrianHasLeftTheChat', 'this away message is now on european time.'],
    ['Branden Grace', 'GracePeriodExpired', 'the matching shirts were getting a little intense.'],
    ['Brooks Koepka', 'KoepkaSeeYa', 'removed myself from the distribution list before it was cool.'],
    ['Charles Howell III', 'CH3ckedOut', 'three initials. zero unread team announcements.'],
    ['David Puig', 'PuigUnplugged', 'please forward my mail. not the team polos.'],
    ['Graeme McDowell', 'GMacLoggedOut', 'new chapter. same inability to unsubscribe from emails.'],
    ['Ian Poulter', 'PoultergeistOffline', 'the wardrobe has entered the transfer portal.'],
    ['Jon Rahm', 'RahmServiceUnavailable', 'this screen name is no longer accepting team-building exercises.'],
    ['Louis Oosthuizen', 'OostOutOfOffice', 'left the group. still somehow getting the calendar invites.'],
    ['Lucas Herbert', 'HerbertHasDisconnected', 'i thought “ripper” was a phase.'],
    ['Patrick Reed', 'ReedReceiptOff', 'read receipts: off. membership enquiry: sent.'],
    ['Sergio Garcia', 'SergioSignedOff', 'please remove me from the next vision deck.'],
    ['Thomas Pieters', 'PietersOut', 'uninstalled. the polo is still in the laundry.'],
    ['Tom McKibbin', 'McKibbinBRB', 'brb means something different when u pack all ur stuff.'],
    ['Tyrrell Hatton', 'HattonHadEnough', 'muted the chat. then remembered i could just leave.']
  ];
  offline.forEach(([name, handle, message]) => add(name, 'offline', handle, message,
    name === 'Brooks Koepka' ? 'Left LIV by mutual agreement in December 2025.' :
    name === 'Patrick Reed' ? 'Chose not to renew his LIV contract in January 2026.' :
    name === 'Sergio Garcia' ? 'Reached a termination agreement; listed among departures by Golf Channel on October 26.' :
    'Reported as a departure from the proposed LIV 2.0 league.',
    ['Brooks Koepka', 'Patrick Reed'].includes(name) ? ['exits'] : ['decisions']));

  // Current official team members and listed wildcards; prior departures above are retained.
  const idle = [
    ['Anirban Lahiri', 'LahiriLoading', 'still here. emotionally buffering.'],
    ['Anthony Kim', 'AKBackAgain', 'came back and everyone was packing. sick.'],
    ['Björn Hellgren', 'HellgrenOnHold', 'the group project has become an individual assignment.'],
    ['Bryson DeChambeau', 'xX_BrysonOfflineIsALie_Xx', 'filming a response to ur response to my response. please respect the process.'],
    ['Bubba Watson', 'BubbaBRB', 'putting the phone down. picking it up. putting it down.'],
    ['Byeong Hun An', 'AnUnreadMessage', 'just joined and the group chat is already on fire.'],
    ['Caleb Surratt', 'SurrattStillLoading', 'does anyone know who the group admin is now.'],
    ['Cameron Smith', 'CamUStillThere', 'typing… deleting… going fishing.'],
    ['Carlos Ortiz', 'OrtizOnHold', 'the group chat says 12 members but only 2 are typing.'],
    ['Charl Schwartzel', 'SchwartzelStatusUnknown', 'the welcome packet said nothing about this part.'],
    ['Danny Lee', 'DannyLeaveMeOnRead', 'refreshing the buddy list counts as practice right.'],
    ['Dean Burmester', 'DeanOfUnreadMessages', 'a little less global family. a little more reply all.'],
    ['Do-Yeob Mun', 'MunMoodLoading', 'can someone pin the actual plan.'],
    ['Dustin Johnson', 'DJDoNotDisturb', 'the phone is on silent. the situation is not.'],
    ['Elvis Smylie', 'SmylieThruIt', 'new school. weird assembly.'],
    ['Harold Varner III', 'HV3Dots', 'three dots. no announcement.'],
    ['Jason Kokrak', 'KokrakConnectionPending', 'is the wifi bad or is everyone avoiding this.'],
    ['Joaquin Niemann', 'NiemannNeedsSpace', 'please stop reading into my playlist.'],
    ['Josele Ballester', 'BallesterBRB', 'this was not covered at orientation.'],
    ['Laurie Canter', 'CanterUAnswer', 'back again. why are the chairs in a circle.'],
    ['Lee Westwood', 'WestwoodWhatever', 'too old for this drama. still checking the chat though.'],
    ['Luis Masaveu', 'MasaveuMaybe', 'trying to find the part of the group project with my name on it.'],
    ['Marc Leishman', 'LeishMeOnRead', 'gone to get a snack. do not announce anything while im gone.'],
    ['Martin Kaymer', 'KaymerConnectionLost', 'please send the plan as a pdf this time.'],
    ['Matthew Wolff', 'WolffInTheGroupChat', 'the pack has enabled disappearing messages.'],
    ['Michael La Sasso', 'LaSassoLastSeen', 'orientation was literally five minutes ago.'],
    ['Miguel Tabuena', 'TabuenaToBeContinued', 'the group chat has become a holding pattern.'],
    ['Minkyu Kim', 'KimCurrentlyBuffering', 'the loading screen has a loading screen.'],
    ['Paul Casey', 'CaseyByCasey', 'this could have been an email. apparently it is 47 emails.'],
    ['Peter Uihlein', 'UihleinUnread', 'if the plan changes again just update the away message.'],
    ['Phil Mickelson', 'LeftyOnIdle', 'please leave a message after the increasingly long pause.'],
    ['Richard T. Lee', 'RichardTBD', 'the t stands for to be determined now.'],
    ['Sam Horsfield', 'HorsfieldHoldMusic', 'i have memorized the hold music.'],
    ['Scott Vincent', 'VincentViewing', 'seen the message. processing the attachment.'],
    ['Sebastian Muñoz', 'MunozMaybeLater', 'the group chat notification has become my resting heart rate.'],
    ['Talor Gooch', 'GoochStatusPending', 'please no more new eras until after lunch.'],
    ['Thomas Detry', 'DetryAgainLater', 'checking my options. and my phone. mostly my phone.'],
    ['Younghan Song', 'SongStillBuffering', 'track 1: hold music. track 2: also hold music.'],
    ['Yosuke Asaji', 'AsajiAwayForNow', 'not ignoring u. the entire league is buffering.']
  ];
  idle.forEach(([name, handle, message]) => add(name, 'idle', handle, message,
    name === 'Bryson DeChambeau' ? 'Reportedly working to support the restart, but a definitive public playing commitment was not verified. Kept Idle under this site’s conservative classification.' :
    'No definitive public LIV 2.0 decision verified in the reporting reviewed. Idle means unconfirmed here, not proof that the player is undecided.',
    name === 'Bryson DeChambeau' ? ['bryson', 'decisions'] :
    ['Elvis Smylie', 'Phil Mickelson'].includes(name) ? ['roster', 'exits'] : ['uncertain', 'roster']));
  add('Patrick Cantlay', 'lurkers', 'Patrick Cantlay', 'Attendance unverified.', 'A permanent site joke. Not a LIV roster entry.', []);
  return { checked, sources, players };
})();
