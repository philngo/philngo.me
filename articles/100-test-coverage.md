_Test coverage measures the lines or statements of source code your tests execute. Although it may not tell you much about the individual quality of those tests, it can give you a sense for how thorough they are._

If you have never worked on a project with 100% test coverage, my guess is that you are in the majority. Not many projects have 100% test coverage. It is really difficult, and not always practical, to test _every single_ line of code.

When it can be achieved though, it has some significant benefits. Aside from the obvious - well-tested code is generally less buggy and more maintainable than poorly tested code - there are some more subtle benefits as well. For instance, there is a very noticeable visual difference between 99% and 100% test coverage in coverage reports. That alone can be a strong motivator to maintain a high level of coverage, especially since coverage reports can point out exactly which lines aren't covered.

Let me illustrate what that looks like in practice. Here's what a coverage regression looks like:

```
----------- coverage: platform linux, python 3.6.6-final-0 -----------
Name                                     Stmts   Miss  Cover   Missing
----------------------------------------------------------------------
eemeter/__init__.py                         19      0   100%
eemeter/__version__.py                       9      0   100%
eemeter/caltrack/__init__.py                 4      0   100%
eemeter/caltrack/design_matrices.py         23      0   100%
eemeter/caltrack/hourly.py                  42      0   100%
eemeter/caltrack/usage_per_day.py          483      1    99%   744
eemeter/cli.py                              44      0   100%
eemeter/derivatives.py                     134      0   100%
eemeter/exceptions.py                       12      0   100%
eemeter/features.py                        253      0   100%
eemeter/io.py                               52      0   100%
eemeter/metrics.py                          78      0   100%
eemeter/samples/__init__.py                  2      0   100%
eemeter/samples/load.py                     31      0   100%
eemeter/segmentation.py                    106      0   100%
eemeter/transform.py                        83      0   100%
eemeter/visualization.py                    36      0   100%
eemeter/warnings.py                         11      0   100%
tests/conftest.py                           21      0   100%
tests/test_caltrack_design_matrices.py      56      0   100%
tests/test_caltrack_hourly.py               53      0   100%
tests/test_caltrack_usage_per_day.py       832      0   100%
tests/test_cli.py                           46      0   100%
tests/test_derivatives.py                  202      0   100%
tests/test_exceptions.py                    22      0   100%
tests/test_features.py                     436      0   100%
tests/test_io.py                           121      0   100%
tests/test_metrics.py                      147      0   100%
tests/test_samples.py                       31      0   100%
tests/test_segmentation.py                 112      0   100%
tests/test_transform.py                    144      0   100%
tests/test_version.py                        4      0   100%
tests/test_visualization.py                 61      0   100%
tests/test_warnings.py                       9      0   100%
----------------------------------------------------------------------
TOTAL                                     3719      1    99%
```

Here's what it looks like fixed:

```
----------- coverage: platform linux, python 3.6.6-final-0 -----------
Name                                     Stmts   Miss  Cover   Missing
----------------------------------------------------------------------
eemeter/__init__.py                         19      0   100%
eemeter/__version__.py                       9      0   100%
eemeter/caltrack/__init__.py                 4      0   100%
eemeter/caltrack/design_matrices.py         23      0   100%
eemeter/caltrack/hourly.py                  42      0   100%
eemeter/caltrack/usage_per_day.py          483      0   100%
eemeter/cli.py                              44      0   100%
eemeter/derivatives.py                     134      0   100%
eemeter/exceptions.py                       12      0   100%
eemeter/features.py                        253      0   100%
eemeter/io.py                               52      0   100%
eemeter/metrics.py                          78      0   100%
eemeter/samples/__init__.py                  2      0   100%
eemeter/samples/load.py                     31      0   100%
eemeter/segmentation.py                    106      0   100%
eemeter/transform.py                        83      0   100%
eemeter/visualization.py                    36      0   100%
eemeter/warnings.py                         11      0   100%
tests/conftest.py                           21      0   100%
tests/test_caltrack_design_matrices.py      56      0   100%
tests/test_caltrack_hourly.py               53      0   100%
tests/test_caltrack_usage_per_day.py       844      0   100%
tests/test_cli.py                           46      0   100%
tests/test_derivatives.py                  202      0   100%
tests/test_exceptions.py                    22      0   100%
tests/test_features.py                     436      0   100%
tests/test_io.py                           121      0   100%
tests/test_metrics.py                      147      0   100%
tests/test_samples.py                       31      0   100%
tests/test_segmentation.py                 112      0   100%
tests/test_transform.py                    144      0   100%
tests/test_version.py                        4      0   100%
tests/test_visualization.py                 61      0   100%
tests/test_warnings.py                       9      0   100%
----------------------------------------------------------------------
TOTAL                                     3731      0   100%
```

Doesn't that look nice? As you can see, the exact nature and severity of coverage regressions is immediately apparent when you're starting from 100% coverage. I can go look at `eemeter/caltrack/usage_per_day.py` line 744 and see there is a single uncovered statement, which happens to be a block of code that issues a warning.

So what gives? Why don't more projects have 100% coverage?

The problem is that true 100% test coverage is really hard to achieve in practice, especially if it hasn't been the standard since the start of the project. And even though it's usually possible with a lot of hard work, after some point you get diminishing returns. Consider: is writing more tests for code that is already pretty maintainable really better than working on anything else? Not always. So most projects encourage writing tests, but don't bother mandating 100% coverage. I don't blame them.

But there is a strategy for getting to 100% coverage which I think often gets overlooked. And it is a lot easier that writing real tests. The strategy is to add markers in your code that indicate to your coverage counter to _ignore all untested blocks of code_.

This may sound pretty extreme. In projects with pretty low test coverage, this can feel like cheating - especially if the project maintainers consider test coverage to be primarily a _metric_. And for the purpose of the metric, it probably is cheating!

But I think that attitude is generally misses a key insight: that test coverage is primarily a _tool_, and secondarily a metric. This subtle difference illuminates why an aggressive “ignoring” strategy helps test coverage really shine as a tool.

Here's the system I've found works best:

1. **Write tests as normal.** There's no need to write more tests than you usually would for this strategy to work (although this strategy may encourage and enable that).
2. **Configure coverage reports to report line-by-line coverage.** Sometimes this is enabled by default, but if it's not, turn it on. This gives a detailed picture of the state of the test coverage and lets you figure out where you're missing tests. At first this extra information can be entirely overwhelming, but this is a temporary flaw.
3. **Systematically add markers to your source files to ignore test coverage for just the untested code.** Add these markers as unobtrusively as possible. For instance, often you can add these markers to the start of a block to ignore the whole block. This should get you up to “100%” coverage. In the coverage counter I use, this is a `# pragma: no cover`. You may find it helpful to work file by file. That's what I did and it was surprisingly painless. Ideally you should add a comment or two  about why the code is not tested, even if its just "I haven't gotten around to it." This will help newcomers understand what's going on.
4. **Always restore 100% coverage when adding new code, preferably by adding new tests, but otherwise by adding an ignore marker.** This habit shouldn't be too tricky if starting from 100% coverage, because the exact lines which aren't covered should be reported and easily visible in the line by line coverage report.
5. **Whenever you want to see or increase your "true" test coverage, temporarily configure the coverage counter to disable the ignores when counting coverage.** Often this can be done with a CLI flag. This mode should correspond with the coverage on the project before systematically adding ignore markers. Alternatively, if you're only interested in developing tests and increasing coverage for one relevant part of the code, you can just edit the coverage ignore statements for that section of the code base.
6. **(Optional) If you want to keep the original metric, permanently configure high level metrics (e.g, badges) to disable the ignores.** This may help eliminate any lingering feeling that this is cheating. If you do this, local tests should still be configured to respect the ignore markers.
7. Document in your contributing guide that this strategy is being used and inform contributors of the reasons behind it, and how to work with it.

I call this the “fake it ‘til you make it” approach to 100% test coverage. It’s not true 100% test coverage, it's more like “100% coverage of the parts I intended to test”, which is a better standard to be shooting for anyway.

I recently implemented this strategy on three of my most active repositories, and I have found it to be an unequivocal improvement. I and the other developers I work with find that:

1. 100% test coverage is way easier to maintain than 99% test coverage.
2. If the code base starts at 100% test coverage, line by line coverage reports are actually readable.
3. It's helpful that coverage ignore markers are visible in the code as a tangible and immediate reminders for every block of code that is not covered.
4. It's not burdensome or difficult to remove or disable the ignore markers when necessary.
5. Perhaps most importantly, we feel generally encouraged to write tests that are both thorough and simple.
6. We find ourselves catching errors in our tests that we wouldn't  otherwise have caught - the most common of these is that we have two tests with the same name, one of which overwrites the other. This shows up in the coverage. This is probably only a problem in languages that allow that kind of syntax like Python does.

I have found this strategy to be quite productive for the codebases and teams I work with, but I imagine that results may vary. I haven't yet found a scenario in which this is worse than the status quo, but I could imagine something like that out there. If this or a strategy like it is working (or not working) for you, I'd be pretty interested to know why.
