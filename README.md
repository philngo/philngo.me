Personal website
===

[https://philngo.me](https://philngo.me)


Initial domain setup
---

Following instructions [here](
https://zeit.co/docs/v2/domains-and-aliases/adding-a-domain/#4.-using-a-custom-domain-with-a-cname
).

1. Add a ALIAS record for `philngo.me` pointing to `alias.zeit.co`.
2. Run `now alias https://philngome-g68g4s0f8.now.sh/ philngo.me`. This fails but has token we can use for verification.
3. Add the `_now` TXT record that was in the output (has verification token).
4. Run `now alias https://philngome-g68g4s0f8.now.sh/ philngo.me` again. (This succeeds and gives us a cert too).
5. Add `"alias": ["philngo.me"]`, which means this alias is applied on master branch deploys.

Contributing
---

1. Make a PR at [github](
https://github.com/philngo/philngo.me/pull/new/<your-branch>
).
2. Zeit will make a new deployment from that branch.
3. Merge and the new master will be deployed to philngo.me.
