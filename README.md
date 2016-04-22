[Memorable Information Rememberer](https://chrome.google.com/webstore/detail/concdkcnjhjifbniidekchmgppbjdmkb)
================================

A Chrome Extension for autocompleting memorable information forms, such as those
often found on UK online banking.

[![Screenshot](https://raw.githubusercontent.com/stevelacey/memorable-information-rememberer/master/screenshot.png)](https://chrome.google.com/webstore/detail/concdkcnjhjifbniidekchmgppbjdmkb)


Supports
--------

- Halifax
- Lloyds
- Natwest
- RBS (probably, the website looks just like Natwest's)
- …and probably more

If the website you're using doesn't work, it probably won't require much effort
to add the support, but usually an account is required to get to these screens,
feel free to fork the repo at https://github.com/stevelacey/memorable-information-rememberer,
pull requests are more than welcome.


Usage
-----

Section names (as seen in the options UI) refer to the page/section heading
(h1/h2/h3) that describes the section of HTML DOM where the form fields reside.
Usually this is easily guessed, "memorable information" or "pin" for example.

A notable exception is Lloyds, where there is no heading for the memorable
information area, so the main heading on the page has to be used, see the
screenshot for an example. Additionally, Lloyds presents radio options for
choosing a login method ahead of entering memorable information, the extension
therefore clicks any labels containing "memorable info" ahead of autocompletion.


Warnings
--------

If you are setting up an account for the first time, it is advisable to avoid
the autosubmit feature until you are confident the submission is successful,
repeated failed submissions are likely to lock your account.

Memorable Information Rememberer stores data in your Chrome user storage
unencrypted, it is advisable that you make sure any credentials you store are
not used elsewhere and that your account password is strong.
