Personal website
===

[https://philngo.me](https://philngo.me)

Initial setup
---

### Domain

Following instructions [here](
https://zeit.co/docs/v2/domains-and-aliases/adding-a-domain/#4.-using-a-custom-domain-with-a-cname
).

1. `$ now domains add philngo.com`  (verify `_now TXT` record)
2. `$ now domains verify philngo.com`  (should see Success!)
2. Add a ALIAS record for `philngo.me` pointing to `alias.zeit.co`.
1. Add a CNAME record for `www.philngo.me` pointing to `alias.zeit.co`.
2. Run `now alias https://philngome-g68g4s0f8.now.sh/ philngo.me`. This fails but has token we can use for verification.
3. Add the `_now` TXT record that was in the output (has verification token).
4. Run `now alias https://philngome-g68g4s0f8.now.sh/ philngo.me` again. (This succeeds and gives us a cert too).
5. Add `"alias": ["philngo.me", "www.philngo.me"]`, which means this alias is applied on master branch deploys.

### Vue

Vue project created using vue cli v3.2.1. with yarn.
See [Configuration Reference](https://cli.vuejs.org/config/).
```
cd ..
vue create -n philngo.me  # use defaults
cd philngo.me
vue add router
vue add vuex
```

After that was set up with default config, add the following to connect
now and the vue build.
```
# add to package.json
"scripts": {
...
"now-build": "npm run build"
}

# add to now.json
"builds": [
  ...
  { "src": "package.json", "use": "@now/static-build" }
]

# for html5 history
"routes": [
  ...
  { "src": "/((?!\\.js|\\.css|\\.html|\\.ico|\\.map).)*$", "dest": "index.html" }
]
```

Contributing
---

1. Make a PR at [github](
https://github.com/philngo/philngo.me/pull/new/<your-branch>
).
2. Zeit will make a new deployment from that branch.
3. Merge and the new master will be deployed to philngo.me.


Development commands
---

```
yarn install  # initial setup
yarn run serve  # local dev server
```

Environment
---

There doesn't seem to be a good way to run a local dev version of the now-based
API, so here's a workaround: set the following in `.env.local`, which is not
version-controlled. This will point the locally running app at any deployed
version of the API. With now, basically every commit on every PR branch gets
deployed.

    # .env.local
    VUE_APP_API_SERVER=https://philngo.me
