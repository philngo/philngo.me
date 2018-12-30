## Why design docs beat whiteboards

Over the past couple of years I've found that using a specific structure when writing design docs - defined and detailed below - is one of the most effective ways of planning software architectures and implementations.

First - some background. A few of my early gigs as a software engineer fit roughly into the same mold: I was the sole engineer working with the founder(s) to get a fledgling startup off the ground. In most cases, those efforts involved many sessions at the whiteboard hashing out everything from the grand company master plan to the minutia of an ongoing feature implementation. We would get everyone in a room in front of a whiteboard and wouldn't leave until either time ran out or everyone was on the same page about whatever it was we were discussing - usually it was the former.

That brute-force approach to communication only works when circumstances allow a synchronous, in-person meeting and when everyone in that meeting is focused and working toward the same end. In those narrow circumstances it can work quite well - the white board is a nice canvas for diagrams, and having a  single unified discussion can help to expose differences of opinion. But it generally fails to scale beyond that. For distributed teams or teams with more two or three people, it becomes increasingly difficult to find a time and place for all relevant personnel to meet simultaneously. And even in those cases when it's possible, rarely does an ad hoc session at the whiteboard yield to the structures of an agenda.

My current fully distributed team has long since outgrown the ability to get everyone in a room together as often as we need to communicate. Fortunately, we have a structured, asynchronous successor to the whiteboard session - we call it a "design doc". I find that writing and sharing a design doc will consistently lead to a concrete outcome and encourages participants to put forward their best reasoning at their own pace in a way that is impossible at the whiteboard.

Some design docs are more useful than others, but we've found that the most useful ones share a consistent structure. We have been continually refining the a checklist that helps the author write a maximally useful design doc. Here it is in its essential form:

##  Design doc checklist

A design doc should include the following sections.

1. Purpose - review the business case. Why does the proposal matter? It is often helpful to include additional context or background. A requirement to put implementations in terms of business requirements forces us to think practically and creatively through the trade-offs of the several proposed implementations. Because features take time to implement, review, and maintain, we save a lot of time and effort when we kill bad ideas quickly.

2. Proposal(s) - outline the proposed solution(s). If providing multiple possible solutions, the author should try to pick one that they think will work and explain why they are recommending it.  More often than not, reviewers will disagree about what constitutes the most promising proposal. Sometimes an alternative or hybrid proposal will arise during discussion that works better. Sometimes none of the proposals gain consensus. It can be difficult to go back to the drawing board after a design is rejected, but it's always worth it. The opportunity for early feedback and discussion generally makes for higher quality implementations.

3. Example(s) - work out some of the key details and give an example or two to help people understand what the proposals are describing. These details often change after the document has been written and reviewed, but that's ok. The examples should be sketches, not full implementations.

4. Next steps - plan out action items. Who should be involved? How much time or effort will be required?

Sometimes these components become the distinct sections in the document, but it's never a problem if they're a bit more integrated as long as they're all there in some form.

## A few other pointers

- Writing the design doc is a little bit useful for the author who is writing it, just like how writing a first draft of an essay will help you figure out your thesis, but the value multiplies when people start commenting on and suggesting revisions.
- Commenting should be asynchronous. If a lot of discussion is happening, consider a breaking that discussion out of the document and into a synchronous meeting. That meeting is likely to be a lot more productive than one that occurred without a design doc first having been written.
- If in doubt about whether or not a feature is "big enough" to require a design doc, err toward writing one. Lincoln (apparently) once said, "If I had an hour to chop down a tree, I'd spend 45 minutes sharpening the axe and 15 minutes chopping."
- I imagine the ideal structure will vary a bit from team to team. I think it was important for our team that everyone had a chance to buy into the process.
- Design docs should be quick and dirty.

## Should design docs live on beyond the discussion?

As a team, we write so many of these that questions of the following sort have arisen:

- Should design docs be collected as some sort of history?
- Should design docs be updated to reflect comments or outcomes of discussions?
- Should design docs be used as feature documentation?

I think the answer to all of these questions is "no". Design docs should be ephemeral because their purpose is to foster productive discussion and guide initial planning. If discussion moves far enough away from the center of gravity of the document that a large update is needed, it's usually easier to start with a blank slate or just to jump straight to the implementation. I find that after the first round of discussion, code review is often more productive and relevant. Design docs are messy, littered with comments and usually outdated within a few hours of starting a real life implementation. But they're useful in the moment!
