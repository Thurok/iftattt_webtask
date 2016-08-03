# If This And This Then That
IfThisAndThisThenThat (iftattt) service provides an extended functionality to the one offered by IfThisThenThan (https://ifttt.com/). Iftattt allows you to concatenate different channels to trigger an action. For instance, *IF* you are not at home *AND* you take a picture with your phone, upload it to your could service account.

This service is more focused for developers or DIY lovers, since the action triggered (the That) is an http request you have previously registered.

# How To
First step is to make a new register. In order to do so, you can call the ifThisAndThisThenThat_register service like:

https://webtask.it.auth0.com/api/run/wt-pauguillamonjaime-gmail_com-0/ifThisAndThisThenThat_register?webtask_no_cache=1&urlThat=http://www.google.com

If everything went ok, you will receive a message like:
"Successful register. Your iftattt id:2 Your THAT url:http://www.google.com"

When the register is done, the ifThisAndThisThenThat service can be called in order to enable or disable any of both conditions. In order to do so, this service expects the next parameters:
- id: your registered id
- condition: can be "this" or "andThis" in order to enable/disable the THIS or the ANDTHIS channels.
- enable: [optional]. If not available it will be true. If available, anything different than "1" is considered false.

Enabling THIS:
https://webtask.it.auth0.com/api/run/wt-pauguillamonjaime-gmail_com-0/ifThisAndThisThenThat?webtask_no_cache=1&id=1&condition=this&enable=1

Disabling THIS:
https://webtask.it.auth0.com/api/run/wt-pauguillamonjaime-gmail_com-0/ifThisAndThisThenThat?webtask_no_cache=1&id=1&condition=this&enable=0

Enabling ANDTHIS:
https://webtask.it.auth0.com/api/run/wt-pauguillamonjaime-gmail_com-0/ifThisAndThisThenThat?webtask_no_cache=1&id=1&condition=andThis&enable=1

Disabling ANDTHIS:
https://webtask.it.auth0.com/api/run/wt-pauguillamonjaime-gmail_com-0/ifThisAndThisThenThat?webtask_no_cache=1&id=1&condition=andThis&enable=0

When both conditions (THIS and ANDTHIS) are true, the THAT is triggered.


