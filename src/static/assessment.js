// Copyright 2020 rTraction
//   Licensed under the Apache License, Version 2.0 (the "License");
//   you may not use this file except in compliance with the License.
//   You may obtain a copy of the License at
//       http://www.apache.org/licenses/LICENSE-2.0
//   Unless required by applicable law or agreed to in writing, software
//   distributed under the License is distributed on an "AS IS" BASIS,
//   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//   See the License for the specific language governing permissions and
//   limitations under the License.
$(document).ready(function() {
  // QUESTION "PAGES"
  var q0 = $("#q0"),
    q1 = $("#q1"),
    q2 = $("#q2"),
    q3 = $("#q3"),
    q4 = $("#q4"),
    q5 = $("#q5"),
    q6 = $("#q6");

  // RESULT "PAGES"
  var cerb = $("#cerb"),
    sickEI = $("#sickEI"),
    resultframe = $("#resultframe"),
    regEI = $("#regEI"),
    sickEIself = $("#sickEIself"),
    EIself = $("#EIself"),
    none = $("#none");

  // ARRAYS OF QUESTION/RESULT PAGES (used to show/hide content)
  var qArray = [q0, q1, q2, q3, q4, q5, q6];
  var rArray = [cerb, resultframe, sickEI, regEI, sickEIself, EIself, none];

  var footer = $("footer");

  // event handlers for back and reset buttons
  $("body")
    .on("click", ".backBtn", function() {
      goBack();
    })
    .on("keypress", ".backBtn", function(e) {
      if (e.which == 13) {
        goBack();
      }
    })
    .on("click", ".resetBtn", function() {
      doReset();
    })
    .on("keypress", ".resetBtn", function(e) {
      if (e.which == 13) {
        doReset();
      }
    });

  // Tracking for mouse being in the window.
  // We are using this to differentiate between
  // in-page back button and browser buttons
  document.onmouseover = function() {
    //User's mouse is inside the page.
    window.innerDocClick = true;
  };

  document.onmouseleave = function() {
    //User's mouse has left the page.
    window.innerDocClick = false;
  };

  window.onhashchange = function() {
    if (window.innerDocClick) {
      window.innerDocClick = false;
    } else {
      goBack(window.location.hash || null);
    }
  };

  // APPLICATION FUNCTIONS
  init();

  function init() {
    // reveal the first question/buttons
    window.history.pushState(null, document.title, "#q0");
    reveal(q0);
  }

  function disable(x) {
    // hide the element on the page via fadeOut
    x.add(footer).fadeOut(200);
  }

  function reveal(x) {
    x.add(footer)
      .delay(300)
      .fadeIn();
  }

  function goBack(hash) {
    var hashEl = hash ? $(hash) : null;
    var popped = hashEl || stack.pop();

    // If we have no history we can't go back
    if (!popped) return;

    // hide all questions elements on the page
    for (var i = 0; i < qArray.length; i++) {
      disable(qArray[i]);
    }
    // hide all answers elements on the page
    for (var i = 0; i < rArray.length; i++) {
      disable(rArray[i]);
    }

    location.href = popped.selector;
    reveal(popped);
  }

  function doReset() {
    goBack("#q0");
  }

  /*
  ANSWERS - the variables are set when the according buttons are clicked.
  The set variables then reveal the according result sections if "true".
  This is done in the last question - see if clauses at bottom of script.
  */

  var stack = [],
    self = false,
    is_ei = false,
    employMedical = false,
    employClosure = false,
    employOther = false;

  // QUESTION BUTTON ACTIONS

  // Landing page btns
  $("#launch").click(function() {
    prev = q0;
    disable(q0);
    reveal(q1);
    stack.push(q0);
  });

  //Disclaimer q1 buttons
  $("#accept").click(function() {
    prev = q1;
    disable(q1);
    reveal(q2);
    stack.push(q1);
  });
  $("#no_accept").click(function() {
    prev = q1;
    disable(q1);
    stack.push(q1);
  });

  //q2 buttons
  $("#noSelf").click(function() {
    self = false;
    prev = q2;
    disable(q2);
    reveal(q3);
    stack.push(q2);
  });
  $("#self").click(function() {
    self = true;
    prev = q2;
    disable(q2);
    reveal(q3);
    stack.push(q2);
  });

  // q3 btns
  $("#ei_no").click(function() {
    is_ei = false;
    prev = q3;
    disable(q3);
    reveal(q4);
    stack.push(q3);
  });
  $("#ei_yes").click(function() {
    is_ei = true;
    prev = q3;
    disable(q3);
    reveal(q4);
    stack.push(q3);
  });

  // q4 btns
  $("#income_no").click(function() {
    income_drop = false
    prev = q4;
    disable(q4);
    if (is_ei == true && self == true) {
      reveal(q6);
    } else if (is_ei == true && self == false) {
      reveal(q5);
    } else {
      reveal(none);
    }
    stack.push(q4);
  });

  $("#income_yes").click(function() {
    income_drop == true
    prev = q4;
    disable(q4);
    if (is_ei == false) {
      reveal(cerb);
    }  else if (self == true) {
        reveal(q6);
      } else {
        reveal(q5);
      }

    stack.push(q4);
  });

  // q5 btns
  $("#employClosure").click(function() {
    employClosure = true;
    employMedical = false;
    employOther = false;
    prev = q5;
    disable(q5);
    if (income) {

    }
    reveal(regEI);
    stack.push(q5);
  });

  $("#employMedical").click(function() {
    employMedical = true;
    employClosure = false;
    employOther = false;
    prev = q5;
    disable(q5);
    reveal(sickEI);
    stack.push(q5);
  });
  $("#employOther").click(function() {
    employOther = true;
    employClosure = false;
    employMedical = false;
    prev = q5;
    disable(q5);
    if (income_drop == true) {
      reveal(cerb)
    } else {
      reveal(none);
    }
    stack.push(q5);
  });

  // q6 btns
  $("#selfMedical").click(function() {
    prev = q6;
    disable(q6);
    if (income_drop == true) {
      reveal(cerb);
    }
    if (is_ei == true) {
      reveal(resultframe);
      reveal(sickEIself);
    }
    stack.push(q6);
  });
  $("#selfReduction").click(function() {
    prev = q6;
    disable(q6);
    if (income_drop == true) {
      reveal(cerb);
    }
    if (is_ei == true) {
      reveal(resultframe);
      reveal(EIself);
    }
    stack.push(q6);
  });
});
