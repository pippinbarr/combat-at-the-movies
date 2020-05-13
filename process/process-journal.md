# The idea; an initial list (Friday, 8 May 2020, 14:44PM)

## The idea

Initially I thought I'd make a game called _COMBATS_ that would be a direct continuation of _PONGS_ and _BREAKSOUT_, with a very broad brief on what the variations might be. But my brain doesn't seem to work with such an unconstrained palette (and it's not impossible I've ever "done" all the obvious takes on a basic arcade game I wanted to take?). Given that I was recently approached to write something for a special issue of a journal on "adaptation in film and videogames", I suppose my mind jumped to adapting films to a specific game, and since _Combat_ was already on my mind, here we are: adapting various movies into the basic framework of Atari's game _Combat_.

Rather that try to totally exhaust the possibilities (by, say, trying to make 36 of them), I think I'll try to put together a package of 10 (like a "top ten") and then can add new sets as with _Chesses_ if it seems relevant.

I think the general principle here is to be reasonable free with the adaptation, including single player versions (maybe even mostly), rather than require simply mechanical changes to the original game's nature. In essence, then, I'm almost talking more about having the tank from _Combat_ "star" in Atari-esque adaptations of famous films?

If I'm framing this from the outset as a research piece, what would I say is interesting about this activity? It continues my more general interest and work on adaptation of many kinds (_Sibilant Snakelikes_, _The Shining_, _Breakout Indies_, _Ancient Greek Punishment_, etc.). In all those cases a major point of interest is in that central tension between source material and destination material, or tenor and vehicle, or what have you. It's a design challenge, but always ends up being about the available mechanics, as well as the (often comedic) relationships between the imagery of the two different parts? A tank in a wig etc.

Plus it just sounds fun.

## An initial list

Should they all be single player? Kind of weird given that COMBAT is two player, but perhaps that's okay? I'm bolding the ones I think could work for now...

- The Shining (going down a hallway, twins appear and elevators spew blood which kills you unless you shoot the twins first?)
- __Citizen Kane__ (tank says Rosebud when you fire, and then you die... some kind of architecture?)
- __Indiana Jones__ (tank running away from a boulder)
- __Star Wars__ (light sabre duel?)
- __The Godfather__ (toll bridge scene)
- Vertigo?
- __2001__ (monolith? Just shoot at it like an angry monkey? Perhaps alongside other tanks)
- Breatheless (new wave cuts?)
- __Au hasard Balthazar__ (just a donkey in the ring instead of another tank?)
- Stalker (something about the zone?)
- __Taxi Driver__ (looking into a mirror? Could deliver the lines if you shoot into the mirror)
- Some Like it Hot (tanks in wigs? Pretty hard to do with the palette...)
- __Blade Runner__ (AI tank that gives the speech when you kill it? While spinning!)
- Burden of Dreams (pushing a boat together?)
- __Godzilla__ (giant tank? You die.)
- __THX1138__ (tank in bright white environment with nothing else)
- To Sir With Love (classroom of tanks and you have to shoot every student to get them to behave themselves?)
- Night of the Living Dead (flee zombie tanks into a safe house?)

So I mean, that's ten. I'm almost certain it would be possible to do ten more with more thought, this was largely a list derived from some obvious choices and the BFI 100 list.

So I suppose next is to implement the basic concept of a tank.

# Graphics; speech (Friday, 8 May 2020, 16:07PM)

## Graphics

Have now put together the world's simplest version of a tank moving around with keyboard controls. By no means a difficult thing, but interesting because of the ways in which Phaser's default toolset/nature is kind of inappropriate to the replication of the Atari game. Most obviously the framerate allows for very smooth movement and rotation of a tank sprite, which completely mismatches the original game, which is characteristically jerky. Further, antialiasing and high resolutions mess with the original graphical style, so that had to be turned off.

Current problem is that with antialiasing off, the tank still doesn't rotate in the same way as the Atari tank. This is presumably because either a) the rotation algorithm doesn't match, or b) the Atari version actually uses custom sprites for each rotational position. If I had to take a guess, I might say it's the latter. In which case I'll need to mimic that myself if I want to pursue making something that genuinely looks like the Atari version.

This is all kind of important because I'm (at least for now) trying to make the game in the "proper" (very low) resolution. There's not much room for error here because it's so obvious if a pixel is out of place. This also has huge implications for what I may or may not be able to communicate in the games themselves. Movement and shooting are both very expressive, but with such a small resolution, the complexity of things I can show might be very low. I'm most concerned about text for the moment, as at least a couple of the games might require that.

## Speech

ALTHOUGH, perhaps I could look into some super degraded-sounding audio of a voice instead? I mean, that's not really something the Atari could do though is it? I'll have to consider that. Well I just did a little research and it sounds like the Atari 2600 _could_ do some version of voice stuff! Here's a [discussion of that on Atari Age](https://atariage.com/forums/topic/46941-speech-synthesis-on-vcs/). There's this ROM hack called [Berzerk Voice Enhanced](https://atariage.com/hack_page.php?SystemID=2600&SoftwareHackID=171), which I'm going to assume stays true to the Atari's sound capacity, given the nature of these people. Apparently the game QuadRun was also one that had voice, just announcing the title.

Having listened to the voice: hyper distorted is the main character. Maybe I could work out how to filter a voice/my voice in Audacity to a point where it sounds enough like this? For Rosebud, You Talkin' To Me? Like Tears in Rain.

# Collisions, confusions (Tuesday, 12 May 2020, 16:01PM)

Well I finally got a version of pixel-based collision done, even though it is truly, truly horrible. Truly horrible. Like, I don't know quite how to express how shit it is? Depressing really. The problems all arise because I'm trying to mimick how the Atari works and how Combat works, and those aren't tools readily available to me with something like Phaser. So it's all very stopgap bad solutions I'm not all that happy with.

But then on the other hand I've been really keen to get the game to at least appear relatively similar to the original game so that it's not distractingly _not_ Combat, you know? I'm losing track of the point of that though. To the extent I'm not _actually_ making an Atari game, why am I trying to fake Atari-style elements? And if I'm not making an Atari game, then what am I actually doing and why am I beholden to Atari graphics, Atari collisions, Atari sound design, and so on?

Is the point of this game that it's literally _Combat_, and therefore an Atari take on these things? Or is the point that it's move scene re-expressed using a tank and _Combat_ happens to be an iconic tank game that gives it some kind of grounding? And also provides constraints of other things like graphic and sound and so forth.

I feel a little confused by the project right now. Can you tell?

# Death to tilemaps (Wednesday, 13 May 2020, 11:55AM)

It's not reflected in the codebase because I just discarded all the changes (thanks Git!), but I spent a good (bad) hour trying to use a tilemap as the basis for drawing levels in the game, to no real avail. It's probably some dumb little thing I'm doing, but in the end who cares.

My new plan: draw tiny little levels in Pixen, do pixel collision as with the tanks, and hey presto.

This stuff is SO boring.

It's probably a good data point showing that not every single thing that happens during development is actually of interest or really worth dwelling on. This was just a technical moment that led nowhere.
