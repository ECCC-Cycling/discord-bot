## Commands

### Event Commands

#### Create Event

Create an event in the database:

```
!event create <code>
<name>
<date>
<subtitle>

!event create uwcc-rgt-2020-12-05
Virtual RGT Training Race
2020-12-05
Unofficial Event Hosted by University of Waterloo
```

#### Add Event Account

Add an account that can make announcements,
and open/lock the event channels.

```
!event add <code> <username>

!event add uwcc-rgt-2020-12-05 @student
```

#### Manage Chat/Voice Channels

Create/open/lock/delete an announcement/chat/voice channel for a race.

New chat/voice will be locked by default.  Use `open` to unlock the channel when you want users to type.

After the event, you can either `lock` or `delete` the channels.

```
!event channel <code> <announce|chat|voice> <create|open|lock|delete>

!event channel uwcc-rgt-2020-12-05 announce create
!event channel uwcc-rgt-2020-12-05 chat open
!event channel uwcc-rgt-2020-12-05 voice lock
```

#### Announce Event

Create a post in `#event-announcements` for the event, with reaction roles.

```
!event announce <code>

!event announce uwcc-rgt-2020-12-05
```
