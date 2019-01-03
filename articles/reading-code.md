I read a fair amount of code. I read code that I've written, code that I'm reviewing, code in libraries with bad documentation, code in libraries with *good* documentation that still doesn't quite answer the usage questions I have, and code in libraries that I'm inspired by for the purpose of learning new techniques. There are a few useful patterns and techniques for reading code I've picked up over the years, so I thought I would describe them here since I don't always see others using them in practice, often to their detriment. Especially for folks who are new to reading (or writing) code, some of these patterns may help you get started.

Reading code is not like reading a book.  Sometimes I see people try to start at the top of a code file or a git diff and read straight through to the bottom. That approach can work in some limited cases  (e.g., one-off scripts), but is not likely to yield much insight in sufficiently complex code bases, especially ones with hundreds of source files and years of history. The problem with that simplistic method is that it fails to take advantage of the structures and patterns in the code. There are a variety of techniques and tools for reading code that are much more likely to be effective, some of which I'll try to discuss here.

Many of these techniques have less to do with the code itself (i.e., the language, the elegance of the code), and more to do with processes that allow you to discover broad structures. This intriguing but probably over-quoted [statement from Linus Torvalds](https://lwn.net/Articles/193245/) comes to mind:

I will, in fact, claim that the difference between a bad programmer and a good one is whether he considers his code or his data structures more important. Bad programmers worry about the code. Good programmers worry about data structures and their relationships.

Actually yes, you should worry about the code. The code matters, and the code often defines the data structures. But he's got a point. What's the point in sweating the small stuff if big stuff is off? Put another way: elegant code can help make it easier to understand or build on top of good data structures, but it can't make up for bad data structures. A novelist can have the best grammar in the world, but if they write a book with a terrible plot, no one will enjoy it.

Although I outline a great variety of approaches for reading code, keep in mind that the most appropriate tool for reading code is going to depend heavily upon your motivations - more on that below.

On final minor disclaimer: most of my personal experience reading code comes from reading python and javascript - so I may be biased by that experience. For the most part though, I think that these techniques are fairly language agnostic. Having never tried to read, say, assembly or Perl, etc, I may not be perfectly qualified for such a broad generalization. That is not to say I haven't tried applying these techniques in libraries for languages with which I'm less intimately familiar - I've read with some success libraries written in C ([git](https://github.com/git/git)), Go ([terraform](https://github.com/hashicorp/terraform)), and Ruby ([rails](https://github.com/rails/rails)), for example.

Sometime in the future, I'll write a post about how to *write* readable code, but today I want to focus on reading code. So in the likely scenario that it's a long time before I get around to writing that post, rest assured that knowing how to *read* code will almost certainly make you better at *writing* code.

## General tips

1. Start by reading the docs. While fun and interesting, reading code is often much less efficient than reading documentation. Documentation will often give you the high level foundation you need to understand the code, should you choose to go deeper. For instance, before you dive into the [git git mirror](https://github.com/git/git), read the docs on [git internals](https://git-scm.com/book/en/v2/Git-Internals-Plumbing-and-Porcelain)!
2. Read code like a computer executes code. Start at entrypoints (function calls, CLI commands, main routines) and follow references. Make abundant use of `grep`, `ctrl-F`, and GitHub search. This will help you be a bit more agnostic to the folder and file structures, which are often rather arbitrary and can be misleading. I've cumulatively wasted hours clicking or `cd` and `ls` -ing through folder structures looking for some entrypoint or another only to remember eventually that I could have just searched.
3. Follow contributing guides. Many projects have contributing guides which will show you how to get a local version up and how to run the tests, which is a great way to discover entrypoints.
4. Familiarize yourself with the concepts of the language(s) used to write the code you are reading. Confusion about syntax will get in the way of clearer understanding. Sometimes the structure of the language can have an effect on how code is organized (e.g., `__init__.py` files or `*.h` files). Also remember that you can also learn a lot even if you don't understand every bit of syntax you encounter.
5. Mostly skim, but don't be afraid to slow down and dig into a part you don't understand once you feel you've made a reasonable attempt to understand the high-level structure. Skimming quickly will help you see the big picture before you get lost in the details.

## Reviewing your own code

Taking a step back and reviewing your own code is a great way improve the way you write software.

I took a writing class in college and the main concept they were trying to drill into us was the value of revisions. We would have to write and submit the same essay multiple times - first draft, second draft, final draft - with weeks of revision and discussion in between. Each time, the essay would improve. All too often, the thesis statement an author starts with in the introduction is not the thesis statement the author ends with in the conclusion. When that happens, authors who know what they are doing rewrite the essay with the new thesis.

This happens in code as well. As a reviewer of your own code, you must be willing and *eager* to delete code. Do not be a victim of the sunk-cost fallacy and get too attached to code you've written.
If this is a struggle, deleting code becomes much easier when a thorough test suite is in place, which can give you confidence you need to refactor regularly. All else equal, less code is better than more code.

The process of reviewing your own code with a critical eye can help you find opportunities for abstractions that you missed on the most recent draft. I often start by looking for repeated patterns or by talking directly to the users of the abstractions and interfaces I wrote, about which ones were most useful or confusing.

I find it productive to try to answer some of the following questions

1. What are the main data structures and abstractions I'm using in this code?
2. How could data structures or abstractions be changed to enable this project to be simpler, more precise and easier to contribute to?
3. Have I written enough tests to know that I can refactor without fear?
4. Would it be easy for others to contribute to or maintain this code? In other words, could they make changes without fear of breaking things?

## Reviewing contributions from others

Reviewing contributions made by others is an important part of building a project. This is a big topic, so I'll just mention one key point here that has made my code review astronomically more effective.

Use a checklist!

Whenever possible, this checklist should be in version control so that it is known by all contributors. Sometimes it makes sense to put this into a `CONTRIBUTING`  file, and if using GitHub, it makes sense to put this in a `.github/PULL_REQUEST_TEMPLATE.md`. The latter is [what I use in the eemeter library](https://github.com/openeemeter/eemeter/blob/master/.github/PULL_REQUEST_TEMPLATE.md). I find it very convenient that GitHub auto-populates the descriptions of all new pull requests using that template because it helps contributors be proactive.

Using a checklist should not add a burden to contributors or reviewers. If it is created with care, it should make it as easy as possible for contributors to comply with contributing guidelines. Consider including at least the following in such a checklist for code review:

1. Does the code conform to the style guide? There are many options for automated code style checking available for many different languages. Some are configurable, some aren't, some just point out issues, some can proactively fix them. Providing instructions here about how to run the automated style checker makes it easy for contributors to write code that conforms. Consider how this could save you from wasting valuable review time and effort discussing the minutia of style-guide conformance.
2. Did the contributor run the existing test suites and add their own? Similarly, this should proactively give instructions to the contributor about how to run the existing automated test suite.
3. Did the contributor follow the correct branching, committing, and merging procedures? The checklist should point out where to find instructions for properly executing these procedures.
4. Did the contributor add appropriate documentation and changelog entries describing their work? Instructions for how to build or contribute to documentation would be appropriate here.

Using this checklist will free you to focus on the highest-value review criteria as you look through the code diff or the branches you're comparing.

1. Is the code written in a way that takes advantage of appropriate existing abstractions?
2. Does the code introduce any new complexity?
3. Are the existing interfaces respected to ensure backwards compatibility, if necessary?

## Reading code because the documentation doesn't cut it

Reading code to learn how to use it is often a last resort after you've read the documentation and come up dry. Maybe you are trying to extend the library and you want to look at some examples of how to use the base class that the library implements.

Let me illustrate with an example. I make heavy use of the [Django REST Framework](https://www.django-rest-framework.org/) python library for, as you may have guessed, writing REST APIs for Django. It has *excellent* documentation, and it also has a very readable code base.

The library documentation for "[Concrete View Classes](https://www.django-rest-framework.org/api-guide/generic-views/#concrete-view-classes)" describe very clearly the methods provided by those classes and the classes from which they inherit. This documentation is helpful and describes exactly how to use these classes.

>  The following classes are the concrete generic views. If you're using generic views this is normally the level you'll be working at unless you need heavily customized behavior.
>
> The view classes can be imported from rest_framework.generics.
>
> CreateAPIView
> -------------
> - Used for create-only endpoints.
> - Provides a post method handler.
> - Extends: GenericAPIView, CreateModelMixin
>
> ListAPIView
> -----------
> - Used for read-only endpoints to represent a collection of model instances.
> - Provides a get method handler.
> - Extends: GenericAPIView, ListModelMixin

These concrete view classes are available in specific, commonly used configurations. Looking at the code for these view classes shows [exactly the same picture](https://github.com/encode/django-rest-framework/blob/030119c117b0ee49f20ea607840967aee055ca76/rest_framework/generics.py#L183-L293), but makes it also clear that these classes are tiny and very simple mappings from HTTP methods to model-related actions, which makes it more obvious, in my opinion, how to use and extend these classes, and how to learn more about what they do.

    # Concrete view classes that provide method handlers
    # by composing the mixin classes with the base view.

    class CreateAPIView(mixins.CreateModelMixin,
                        GenericAPIView):
        """
        Concrete view for creating a model instance.
        """
        def post(self, request, *args, **kwargs):
            return self.create(request, *args, **kwargs)


    class ListAPIView(mixins.ListModelMixin,
                      GenericAPIView):
        """
        Concrete view for listing a queryset.
        """
        def get(self, request, *args, **kwargs):
            return self.list(request, *args, **kwargs)

In this case, the code is almost exactly the same length as the documentation itself, which makes for a pretty good insight-to-effort ratio.

## Reading code to learn how to imitate it

This final category of reading code is, in my opinion, the most difficult, but also the most interesting. I have learned a ton reading through the code of libraries or tools that I frequently use, or which are written by developers whose work I admire.

For example:

- Reading through the `requests` library taught me that [the main API](https://github.com/requests/requests/blob/5c1f72e80a7d7ac129631ea5b0c34c7876bc6ed7/requests/api.py) is organized around a single function (request) with a consistent interface, for which the get/post/patch/put/etc... methods are a really simple wrapper. In retrospect this makes a lot of sense, as they must internally share a lot of logic. It's also really intersting that the get/post/patch/put/etc... methods exist at all - the immediacy, intuitiveness, and discoverability of the interace matters a lot for usability.
- Poking around in the `pandas` library [test suite](https://github.com/pandas-dev/pandas/tree/f67c97e16fe181573d9d3d9bbc14524d4153abdd/pandas/tests) showed me a bunch of examples of tests, and how useful it can be to write specialized functions specifically for testing that help to capture a ton of repeated testing logic.
- Trying to figure out something with timezones a while back I was led to the pytz package source code. I mention it here because it is the most unusual python package I have ever had the good fortune of looking through. But it is extraordinarily useful and tons of popular packages rely on it. It's so ubiquitous that I was initially surprised to learn that it wasn't a built in package. Here it is in all its  glory, mirrored on GitHub for your convenience: https://github.com/stub42/pytz.
- Curiosity about how the cPython sort function worked internally lead me to find the [source code](https://github.com/python/cpython/blob/f8b534477a2a51d85ea1663530f685f805f2b247/Objects/listobject.c#L2203) and also [this fascinating text file](https://github.com/python/cpython/blob/f8b534477a2a51d85ea1663530f685f805f2b247/Objects/listsort.txt) describing it as a "timsort". That's the same Tim (Peters) who wrote the Zen of Python, which I find quite inspiring.

Poking through libraries (I wish I could remember which ones) when I was just starting out writing Python showed me:

1. How to use `setup.py` for packaging python projects
2. That `pytest` with `tox` is a pretty popular test runner configuration
3. That the convention for internal functions is to put an underscore before the function name
4. That the package `six` was used a lot for python 2/3 compatibility
5. That sphinx is a really popular way of building documentation
6. That it's pretty common to do a bunch of `from module import *` in `__init__.py` files specifically
7. That decorators exist and metaclasses exist

Reading code to learn from it is like doing a puzzle. Or like doing an orienteering course. Or like reading a history book. Or like going down a rabbit hole. Or like deep sea fishing. You may also be trawling for unfamiliar concepts, or for useful tools, or for more effective processes. All of these fish may be found in the vast ocean of open source repositories waiting to be explored.
