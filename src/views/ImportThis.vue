<template>
  <div class="import-this">
    <h2>
      About the Zen of Python
      (<a href="https://www.python.org/dev/peps/pep-0020/" class="red" target="_blank">PEP 20</a>)
    </h2>
    <p>
      If you've never tried this before (or even if you have - it's always
      worth seeing again), try opening up a python REPL from the command line and
      importing <code>this</code>:
    </p>
    <pre><code>$ python
Python 3.7.0 (default, Jun 28 2018, 16:38:31)
[Clang 9.1.0 (clang-902.0.39.2)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> import this</code></pre>
    <p>
      You'll see this beautiful easter egg:
    </p>
    <template v-if="showingOutput">
      <pre><code>>>> import this
The Zen of Python, by Tim Peters

Beautiful is better than ugly.
Explicit is better than implicit.
Simple is better than complex.
Complex is better than complicated.
Flat is better than nested.
Sparse is better than dense.
Readability counts.
Special cases aren't special enough to break the rules.
Although practicality beats purity.
Errors should never pass silently.
Unless explicitly silenced.
In the face of ambiguity, refuse the temptation to guess.
There should be one-- and preferably only one --obvious way to do it.
Although that way may not be obvious at first unless you're Dutch.
Now is better than never.
Although never is often better than *right* now.
If the implementation is hard to explain, it's a bad idea.
If the implementation is easy to explain, it may be a good idea.
Namespaces are one honking great idea -- let's do more of those!</code></pre>
      <p>
        Whenever I need a bit of coding inspiration, I sit and stare at this
        for a few minutes. Almost without fail, one or two lines of this will
        be spark an insight that gets me thinking more clearly and productively
        about whatever it is I'm working on.
      </p>
    </template>
    <template v-else>
      <a class="red" @click="() => showingOutput = true">Show output</a>
    </template>
  </div>
</template>

<script>
export default {
  name: 'ImportThis',
  data () {
    return {
      showingOutput: false
    }
  }
}
</script>

<style scoped>
.import-this {
  padding-bottom: 80px;
}
code {
  font-family: Consolas, monaco, monospace;
  font-size: 14px;
  background-color: #e7e8e9;
  padding: 2px 4px;
  border-radius: 2px;
}

pre {
  background-color: #e7e8e9;
  padding: 30px;
  border-radius: 2px;
  overflow-x: auto;
  font-size: 16px;
  line-height: 18px;
}

a {
  cursor: pointer;
}
</style>
