import { c as create_ssr_component, h as subscribe, k as createEventDispatcher, g as get_store_value, o as onDestroy, l as set_store_value, v as validate_component, j as add_attribute, i as escape } from "../../../chunks/ssr.js";
import { w as writable, d as derived } from "../../../chunks/index2.js";
import { i as invalidateAll, a as applyAction, p as page, n as navigating } from "../../../chunks/stores.js";
import { t as tick } from "../../../chunks/scheduler.js";
import { s as splitPath, t as traversePath, m as mapErrors, e as errorShape, a as traversePathsAsync, b as traversePaths, c as setPaths, d as clone$1, f as clearErrors, i as isInvalidPath, S as SuperFormError, g as mergePath, h as comparePaths, p as pathExists, j as flattenErrors, l as loginPostReq, r as registerPostReq, k as forgotPostReq, n as resetPostReq } from "../../../chunks/validators.js";
import * as devalue from "devalue";
import { stringify } from "devalue";
import { B as BROWSER } from "../../../chunks/prod-ssr.js";
import "../../../chunks/index.js";
import { a as PUBLIC_TURNSTILE_SITE_KEY } from "../../../chunks/public.js";
const browser = BROWSER;
const turnstileLoaded = writable(false);
const Turnstile = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_turnstileLoaded;
  $$unsubscribe_turnstileLoaded = subscribe(turnstileLoaded, (value) => value);
  let { siteKey = void 0 } = $$props;
  let { fieldName = "token" } = $$props;
  let { action = void 0 } = $$props;
  let { cData = void 0 } = $$props;
  let { retryInterval = 8e3 } = $$props;
  let { retry = "auto" } = $$props;
  let { theme = "auto" } = $$props;
  let { size = "normal" } = $$props;
  let { forms = true } = $$props;
  let { tabIndex = 0 } = $$props;
  createEventDispatcher();
  if ($$props.siteKey === void 0 && $$bindings.siteKey && siteKey !== void 0)
    $$bindings.siteKey(siteKey);
  if ($$props.fieldName === void 0 && $$bindings.fieldName && fieldName !== void 0)
    $$bindings.fieldName(fieldName);
  if ($$props.action === void 0 && $$bindings.action && action !== void 0)
    $$bindings.action(action);
  if ($$props.cData === void 0 && $$bindings.cData && cData !== void 0)
    $$bindings.cData(cData);
  if ($$props.retryInterval === void 0 && $$bindings.retryInterval && retryInterval !== void 0)
    $$bindings.retryInterval(retryInterval);
  if ($$props.retry === void 0 && $$bindings.retry && retry !== void 0)
    $$bindings.retry(retry);
  if ($$props.theme === void 0 && $$bindings.theme && theme !== void 0)
    $$bindings.theme(theme);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.forms === void 0 && $$bindings.forms && forms !== void 0)
    $$bindings.forms(forms);
  if ($$props.tabIndex === void 0 && $$bindings.tabIndex && tabIndex !== void 0)
    $$bindings.tabIndex(tabIndex);
  $$unsubscribe_turnstileLoaded();
  return `${$$result.head += `<!-- HEAD_svelte-1oh324z_START -->${``}<!-- HEAD_svelte-1oh324z_END -->`, ""} ${``}`;
});
function deserialize(result) {
  const parsed = JSON.parse(result);
  if (parsed.data) {
    parsed.data = devalue.parse(parsed.data);
  }
  return parsed;
}
function clone(element) {
  return (
    /** @type {T} */
    HTMLElement.prototype.cloneNode.call(element)
  );
}
function enhance(form_element, submit = () => {
}) {
  const fallback_callback = async ({
    action,
    result,
    reset = true,
    invalidateAll: shouldInvalidateAll = true
  }) => {
    if (result.type === "success") {
      if (reset) {
        HTMLFormElement.prototype.reset.call(form_element);
      }
      if (shouldInvalidateAll) {
        await invalidateAll();
      }
    }
    if (location.origin + location.pathname === action.origin + action.pathname || result.type === "redirect" || result.type === "error") {
      applyAction();
    }
  };
  async function handle_submit(event) {
    const method = event.submitter?.hasAttribute("formmethod") ? (
      /** @type {HTMLButtonElement | HTMLInputElement} */
      event.submitter.formMethod
    ) : clone(form_element).method;
    if (method !== "post")
      return;
    event.preventDefault();
    const action = new URL(
      // We can't do submitter.formAction directly because that property is always set
      event.submitter?.hasAttribute("formaction") ? (
        /** @type {HTMLButtonElement | HTMLInputElement} */
        event.submitter.formAction
      ) : clone(form_element).action
    );
    const form_data = new FormData(form_element);
    const submitter_name = event.submitter?.getAttribute("name");
    if (submitter_name) {
      form_data.append(submitter_name, event.submitter?.getAttribute("value") ?? "");
    }
    const controller = new AbortController();
    let cancelled = false;
    const cancel = () => cancelled = true;
    const callback = await submit({
      action,
      cancel,
      controller,
      formData: form_data,
      formElement: form_element,
      submitter: event.submitter
    }) ?? fallback_callback;
    if (cancelled)
      return;
    let result;
    try {
      const response = await fetch(action, {
        method: "POST",
        headers: {
          accept: "application/json",
          "x-sveltekit-action": "true"
        },
        cache: "no-store",
        body: form_data,
        signal: controller.signal
      });
      result = deserialize(await response.text());
      if (result.type === "error")
        result.status = response.status;
    } catch (error) {
      if (
        /** @type {any} */
        error?.name === "AbortError"
      )
        return;
      result = { type: "error", error };
    }
    callback({
      action,
      formData: form_data,
      formElement: form_element,
      update: (opts) => fallback_callback({
        action,
        result,
        reset: opts?.reset,
        invalidateAll: opts?.invalidateAll
      }),
      // @ts-expect-error generic constraints stuff we don't care about
      result
    });
  }
  HTMLFormElement.prototype.addEventListener.call(form_element, "submit", handle_submit);
  return {
    destroy() {
      HTMLFormElement.prototype.removeEventListener.call(form_element, "submit", handle_submit);
    }
  };
}
function fieldProxy(form, path) {
  const path2 = splitPath(path);
  const proxy = derived(form, ($form) => {
    const data = traversePath($form, path2);
    return data?.value;
  });
  return {
    subscribe(...params) {
      const unsub = proxy.subscribe(...params);
      return () => unsub();
    },
    update(upd) {
      form.update((f) => {
        const output = traversePath(f, path2, ({ parent, key, value }) => {
          if (value === void 0)
            parent[key] = /\D/.test(key) ? {} : [];
          return parent[key];
        });
        if (output)
          output.parent[output.key] = upd(output.value);
        return f;
      });
    },
    set(value) {
      form.update((f) => {
        const output = traversePath(f, path2, ({ parent, key, value: value2 }) => {
          if (value2 === void 0)
            parent[key] = /\D/.test(key) ? {} : [];
          return parent[key];
        });
        if (output)
          output.parent[output.key] = value;
        return f;
      });
    }
  };
}
async function clientValidation(validators, checkData, formId, constraints, posted) {
  return _clientValidation(validators, checkData, formId, constraints, posted);
}
async function _clientValidation(validators, checkData, formId, constraints, posted) {
  let valid = true;
  let clientErrors = {};
  if (validators) {
    if ("safeParseAsync" in validators) {
      const validator = validators;
      const result = await validator.safeParseAsync(checkData);
      valid = result.success;
      if (!result.success) {
        clientErrors = mapErrors(
          result.error.format(),
          errorShape(validator)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        );
      } else {
        checkData = result.data;
      }
    } else {
      checkData = { ...checkData };
      for (const [key, value] of Object.entries(validators)) {
        if (typeof value === "function" && !(key in checkData)) {
          checkData[key] = void 0;
        }
      }
      const validator = validators;
      const newErrors = [];
      await traversePathsAsync(checkData, async ({ value, path }) => {
        const validationPath = path.filter((p) => /\D/.test(String(p)));
        const maybeValidator = traversePath(validator, validationPath);
        if (typeof maybeValidator?.value === "function") {
          const check = maybeValidator.value;
          let errors;
          if (Array.isArray(value)) {
            for (const key in value) {
              try {
                errors = await check(value[key]);
                if (errors) {
                  valid = false;
                  newErrors.push({
                    path: path.concat([key]),
                    errors: typeof errors === "string" ? [errors] : errors ?? void 0
                  });
                }
              } catch (e) {
                valid = false;
                console.error(`Error in form validators for field "${path}":`, e);
              }
            }
          } else {
            try {
              errors = await check(value);
              if (errors) {
                valid = false;
                newErrors.push({
                  path,
                  errors: typeof errors === "string" ? [errors] : errors ?? void 0
                });
              }
            } catch (e) {
              valid = false;
              console.error(`Error in form validators for field "${path}":`, e);
            }
          }
        }
      });
      for (const { path, errors } of newErrors) {
        const errorPath = traversePath(clientErrors, path, ({ parent, key, value }) => {
          if (value === void 0)
            parent[key] = {};
          return parent[key];
        });
        if (errorPath) {
          const { parent, key } = errorPath;
          parent[key] = errors;
        }
      }
    }
  }
  return {
    valid,
    posted,
    errors: clientErrors,
    data: checkData,
    constraints,
    message: void 0,
    id: formId
  };
}
async function validateObjectErrors(formOptions, Form2, Errors, tainted) {
  if (typeof formOptions.validators !== "object" || !("safeParseAsync" in formOptions.validators)) {
    return;
  }
  const validators = formOptions.validators;
  const result = await validators.safeParseAsync(get_store_value(Form2));
  if (!result.success) {
    const newErrors = mapErrors(result.error.format(), errorShape(validators));
    Errors.update((currentErrors) => {
      traversePaths(currentErrors, (pathData) => {
        if (pathData.key == "_errors") {
          return pathData.set(void 0);
        }
      });
      traversePaths(newErrors, (pathData) => {
        if (pathData.key == "_errors") {
          const taintedPath = pathData.path.length == 1 ? { value: true } : tainted && traversePath(tainted, pathData.path.slice(0, -1));
          if (taintedPath && taintedPath.value) {
            return setPaths(currentErrors, [pathData.path], pathData.value);
          }
        }
      });
      return currentErrors;
    });
  } else {
    Errors.update((currentErrors) => {
      traversePaths(currentErrors, (pathData) => {
        if (pathData.key == "_errors") {
          return pathData.set(void 0);
        }
      });
      return currentErrors;
    });
  }
}
async function validateField(path, formOptions, data, Errors, Tainted, options = {}) {
  function Errors_clear() {
    clearErrors(Errors, { undefinePath: path, clearFormLevelErrors: true });
  }
  function Errors_update(errorMsgs) {
    if (typeof errorMsgs === "string")
      errorMsgs = [errorMsgs];
    if (options.update === true || options.update == "errors") {
      Errors.update((errors) => {
        const error = traversePath(errors, path, (node) => {
          if (isInvalidPath(path, node)) {
            throw new SuperFormError("Errors can only be added to form fields, not to arrays or objects in the schema. Path: " + node.path.slice(0, -1));
          } else if (node.value === void 0) {
            node.parent[node.key] = {};
            return node.parent[node.key];
          } else {
            return node.value;
          }
        });
        if (!error)
          throw new SuperFormError("Error path could not be created: " + path);
        error.parent[error.key] = errorMsgs ?? void 0;
        return errors;
      });
    }
    return errorMsgs ?? void 0;
  }
  const result = await _validateField(path, formOptions.validators, data, Errors, Tainted, options);
  if (result.validated) {
    if (result.validated === "all" && !result.errors) {
      Errors_clear();
    } else {
      result.errors = Errors_update(result.errors);
    }
  } else if (result.validated === false && formOptions.defaultValidator == "clear") {
    result.errors = Errors_update(result.errors);
  }
  return result;
}
async function _validateField(path, validators, data, Errors, Tainted, options = {}) {
  if (options.update === void 0)
    options.update = true;
  if (options.taint === void 0)
    options.taint = false;
  if (typeof options.errors == "string")
    options.errors = [options.errors];
  const Context = {
    value: options.value,
    shouldUpdate: true,
    currentData: void 0,
    // Remove numeric indices, they're not used for validators.
    validationPath: path.filter((p) => /\D/.test(String(p)))
  };
  async function defaultValidate() {
    return { validated: false, errors: void 0, data: void 0 };
  }
  function Tainted_isPathTainted(path2, tainted) {
    if (tainted === void 0)
      return false;
    const leaf = traversePath(tainted, path2);
    if (!leaf)
      return false;
    return leaf.value;
  }
  function Errors_update(updater) {
    Errors.update(updater);
  }
  function Errors_clearAll() {
    clearErrors(Errors, { undefinePath: null, clearFormLevelErrors: true });
  }
  function Errors_fromZod(errors, validator) {
    return mapErrors(errors.format(), errorShape(validator));
  }
  if (!("value" in options)) {
    Context.currentData = get_store_value(data);
    const dataToValidate = traversePath(Context.currentData, path);
    Context.value = dataToValidate?.value;
  } else if (options.update === true || options.update === "value") {
    data.update(($data) => {
      setPaths($data, [path], Context.value);
      return Context.currentData = $data;
    }, { taint: options.taint });
  } else {
    Context.shouldUpdate = false;
  }
  if (typeof validators !== "object") {
    return defaultValidate();
  }
  if ("safeParseAsync" in validators) {
    if (!Context.shouldUpdate) {
      Context.currentData = clone$1(Context.currentData ?? get_store_value(data));
      setPaths(Context.currentData, [path], Context.value);
    }
    const result = await validators.safeParseAsync(Context.currentData);
    if (!result.success) {
      const newErrors = Errors_fromZod(result.error, validators);
      if (options.update === true || options.update == "errors") {
        const taintedFields = get_store_value(Tainted);
        Errors_update((currentErrors) => {
          traversePaths(currentErrors, (pathData) => {
            if (pathData.key == "_errors") {
              return pathData.set(void 0);
            }
          });
          traversePaths(newErrors, (pathData) => {
            if (pathData.key == "_errors" && (pathData.path.length == 1 || Tainted_isPathTainted(pathData.path.slice(0, -1), taintedFields))) {
              return setPaths(currentErrors, [pathData.path], pathData.value);
            }
            if (!Array.isArray(pathData.value))
              return;
            if (Tainted_isPathTainted(pathData.path, taintedFields)) {
              setPaths(currentErrors, [pathData.path], pathData.value);
            }
            return "skip";
          });
          return currentErrors;
        });
      }
      const current = traversePath(newErrors, path);
      return {
        validated: true,
        errors: options.errors ?? current?.value,
        data: void 0
      };
    } else {
      Errors_clearAll();
      return {
        validated: true,
        errors: void 0,
        data: result.data
        // For a successful Zod result, return the possibly transformed data.
      };
    }
  } else {
    const validator = traversePath(validators, Context.validationPath);
    if (!validator || validator.value === void 0) {
      return defaultValidate();
    } else {
      const result = await validator.value(Context.value);
      return {
        validated: true,
        errors: result ? options.errors ?? result : result,
        data: void 0
        // No transformation for Superforms validators
      };
    }
  }
}
const isElementInViewport = (el, topOffset = 0) => {
  const rect = el.getBoundingClientRect();
  return rect.top >= topOffset && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
};
const scrollToAndCenter = (el, offset = 1.125, behavior = "smooth") => {
  const elementRect = el.getBoundingClientRect();
  const absoluteElementTop = elementRect.top + window.pageYOffset;
  const top = absoluteElementTop - window.innerHeight / (2 * offset);
  window.scrollTo({ left: 0, top, behavior });
};
var FetchStatus;
(function(FetchStatus2) {
  FetchStatus2[FetchStatus2["Idle"] = 0] = "Idle";
  FetchStatus2[FetchStatus2["Submitting"] = 1] = "Submitting";
  FetchStatus2[FetchStatus2["Delayed"] = 2] = "Delayed";
  FetchStatus2[FetchStatus2["Timeout"] = 3] = "Timeout";
})(FetchStatus || (FetchStatus = {}));
const activeTimers = /* @__PURE__ */ new Set();
function Form(formEl, timers, options) {
  let state = FetchStatus.Idle;
  let delayedTimeout, timeoutTimeout;
  let aboutToNavigate = false;
  const Timers = activeTimers;
  function Timers_start() {
    Timers_clear();
    Timers_setState(state != FetchStatus.Delayed ? FetchStatus.Submitting : FetchStatus.Delayed);
    delayedTimeout = window.setTimeout(() => {
      if (delayedTimeout && state == FetchStatus.Submitting)
        Timers_setState(FetchStatus.Delayed);
    }, options.delayMs);
    timeoutTimeout = window.setTimeout(() => {
      if (timeoutTimeout && state == FetchStatus.Delayed)
        Timers_setState(FetchStatus.Timeout);
    }, options.timeoutMs);
    Timers.add(Timers_clear);
  }
  function Timers_clear() {
    clearTimeout(delayedTimeout);
    clearTimeout(timeoutTimeout);
    delayedTimeout = timeoutTimeout = 0;
    Timers.delete(Timers_clear);
    Timers_setState(FetchStatus.Idle);
  }
  function Timers_clearAll() {
    Timers.forEach((t) => t());
    Timers.clear();
  }
  function Timers_setState(s) {
    state = s;
    timers.submitting.set(state >= FetchStatus.Submitting);
    timers.delayed.set(state >= FetchStatus.Delayed);
    timers.timeout.set(state >= FetchStatus.Timeout);
  }
  const ErrorTextEvents = formEl;
  function ErrorTextEvents__selectText(e) {
    const target = e.target;
    if (options.selectErrorText)
      target.select();
  }
  function ErrorTextEvents_addErrorTextListeners() {
    if (!options.selectErrorText)
      return;
    ErrorTextEvents.querySelectorAll("input").forEach((el) => {
      el.addEventListener("invalid", ErrorTextEvents__selectText);
    });
  }
  function ErrorTextEvents_removeErrorTextListeners() {
    if (!options.selectErrorText)
      return;
    ErrorTextEvents.querySelectorAll("input").forEach((el) => el.removeEventListener("invalid", ErrorTextEvents__selectText));
  }
  const Form2 = formEl;
  function Form_shouldAutoFocus(userAgent) {
    if (typeof options.autoFocusOnError === "boolean")
      return options.autoFocusOnError;
    else
      return !/iPhone|iPad|iPod|Android/i.test(userAgent);
  }
  const Form_scrollToFirstError = async () => {
    if (options.scrollToError == "off")
      return;
    const selector = options.errorSelector;
    if (!selector)
      return;
    await tick();
    let el;
    el = Form2.querySelector(selector);
    if (!el)
      return;
    el = el.querySelector(selector) ?? el;
    const nav = options.stickyNavbar ? document.querySelector(options.stickyNavbar) : null;
    if (typeof options.scrollToError != "string") {
      el.scrollIntoView(options.scrollToError);
    } else if (!isElementInViewport(el, nav?.offsetHeight ?? 0)) {
      scrollToAndCenter(el, void 0, options.scrollToError);
    }
    if (!Form_shouldAutoFocus(navigator.userAgent))
      return;
    let focusEl;
    focusEl = el;
    if (!["INPUT", "SELECT", "BUTTON", "TEXTAREA"].includes(focusEl.tagName)) {
      focusEl = focusEl.querySelector('input:not([type="hidden"]):not(.flatpickr-input), select, textarea');
    }
    if (focusEl) {
      try {
        focusEl.focus({ preventScroll: true });
        if (options.selectErrorText && focusEl.tagName == "INPUT") {
          focusEl.select();
        }
      } catch (err) {
      }
    }
  };
  {
    ErrorTextEvents_addErrorTextListeners();
    const completed = (cancelled, clearIfNotNavigating = false) => {
      Timers_clear();
      if (!cancelled)
        setTimeout(Form_scrollToFirstError);
      if (clearIfNotNavigating && !aboutToNavigate) {
        Timers_clearAll();
      }
    };
    onDestroy(() => {
      ErrorTextEvents_removeErrorTextListeners();
      completed(true);
    });
    return {
      submitting: () => {
        aboutToNavigate = false;
        Timers_start();
      },
      completed,
      scrollToFirstError: () => {
        setTimeout(Form_scrollToFirstError);
      },
      isSubmitting: () => state === FetchStatus.Submitting || state === FetchStatus.Delayed
    };
  }
}
function cancelFlash(options) {
  if (!options.flashMessage || !browser)
    return;
  if (!shouldSyncFlash(options))
    return;
  document.cookie = `flash=; Max-Age=0; Path=${options.flashMessage.cookiePath ?? "/"};`;
}
function shouldSyncFlash(options) {
  if (!options.flashMessage || !browser)
    return false;
  return options.syncFlashMessage;
}
const noCustomValidityDataAttribute = "noCustomValidity";
function setCustomValidity(el, errors) {
  const message = errors && errors.length ? errors.join("\n") : "";
  el.setCustomValidity(message);
  if (message)
    el.reportValidity();
}
function setCustomValidityForm(formEl, errors) {
  for (const el of formEl.querySelectorAll("input,select,textarea,button")) {
    if (noCustomValidityDataAttribute in el.dataset) {
      continue;
    }
    const error = traversePath(errors, splitPath(el.name));
    setCustomValidity(el, error?.value);
    if (error?.value)
      return;
  }
}
function formEnhance(formEl, submitting, delayed, timeout, errs, Form_updateFromActionResult, options, data, message, enableTaintedForm, formEvents, formId, constraints, tainted, lastChanges, Context_findValidationForms, posted) {
  enableTaintedForm();
  const errors = errs;
  async function updateCustomValidity(validityEl, event, errors2) {
    if (!options.customValidity)
      return;
    if (options.validationMethod == "submit-only")
      return;
    if ("setCustomValidity" in validityEl) {
      validityEl.setCustomValidity("");
    }
    if (event == "input" && options.validationMethod == "onblur")
      return;
    if (noCustomValidityDataAttribute in validityEl.dataset)
      return;
    setCustomValidity(validityEl, errors2);
  }
  async function htmlInputChange(change, event, target) {
    if (options.validationMethod == "submit-only")
      return;
    const result = await validateField(change, options, data, errors, tainted);
    if (result.data && target)
      data.set(result.data);
    if (options.customValidity) {
      const name = CSS.escape(mergePath(change));
      const el = formEl.querySelector(`[name="${name}"]`);
      if (el)
        updateCustomValidity(el, event, result.errors);
    }
  }
  const immediateInputTypes = ["checkbox", "radio", "range"];
  function isImmediateInput(el) {
    return el && (el instanceof HTMLSelectElement || el instanceof HTMLInputElement && immediateInputTypes.includes(el.type));
  }
  async function checkBlur(e) {
    if (options.validationMethod == "oninput" || options.validationMethod == "submit-only") {
      return;
    }
    const immediateUpdate = isImmediateInput(e.target);
    if (immediateUpdate)
      await new Promise((r) => setTimeout(r, 0));
    const changes = get_store_value(lastChanges);
    if (!changes.length)
      return;
    const target = e.target instanceof HTMLElement ? e.target : null;
    for (const change of changes) {
      htmlInputChange(change, "blur", immediateUpdate ? null : target);
    }
    lastChanges.set([]);
  }
  async function checkInput(e) {
    if (options.validationMethod == "onblur" || options.validationMethod == "submit-only") {
      return;
    }
    const immediateUpdate = isImmediateInput(e.target);
    if (immediateUpdate)
      await new Promise((r) => setTimeout(r, 0));
    const changes = get_store_value(lastChanges);
    if (!changes.length)
      return;
    const target = e.target instanceof HTMLElement ? e.target : null;
    for (const change of changes) {
      const hadErrors = (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        immediateUpdate || traversePath(get_store_value(errors), change)
      );
      if (immediateUpdate || typeof hadErrors == "object" && hadErrors.key in hadErrors.parent) {
        setTimeout(() => htmlInputChange(change, "input", immediateUpdate ? target : null), 0);
      }
    }
  }
  formEl.addEventListener("focusout", checkBlur);
  formEl.addEventListener("input", checkInput);
  onDestroy(() => {
    formEl.removeEventListener("focusout", checkBlur);
    formEl.removeEventListener("input", checkInput);
  });
  const htmlForm = Form(formEl, { submitting, delayed, timeout }, options);
  let currentRequest;
  return enhance(formEl, async (submit) => {
    const _submitCancel = submit.cancel;
    let cancelled = false;
    function cancel(resetTimers = true) {
      cancelled = true;
      if (resetTimers && htmlForm.isSubmitting()) {
        htmlForm.completed(true);
      }
      return _submitCancel();
    }
    submit.cancel = cancel;
    if (htmlForm.isSubmitting() && options.multipleSubmits == "prevent") {
      cancel(false);
    } else {
      if (htmlForm.isSubmitting() && options.multipleSubmits == "abort") {
        if (currentRequest)
          currentRequest.abort();
      }
      htmlForm.submitting();
      currentRequest = submit.controller;
      for (const event of formEvents.onSubmit) {
        await event(submit);
      }
    }
    if (cancelled) {
      if (options.flashMessage)
        cancelFlash(options);
    } else {
      const noValidate = !options.SPA && (formEl.noValidate || (submit.submitter instanceof HTMLButtonElement || submit.submitter instanceof HTMLInputElement) && submit.submitter.formNoValidate);
      const validation = await clientValidation(noValidate ? void 0 : options.validators, get_store_value(data), get_store_value(formId), get_store_value(constraints), get_store_value(posted));
      if (!validation.valid) {
        cancel(false);
        const result = {
          type: "failure",
          status: (typeof options.SPA === "boolean" ? void 0 : options.SPA?.failStatus) ?? 400,
          data: { form: validation }
        };
        setTimeout(() => validationResponse({ result }), 0);
      }
      if (!cancelled) {
        switch (options.clearOnSubmit) {
          case "errors-and-message":
            errors.clear();
            message.set(void 0);
            break;
          case "errors":
            errors.clear();
            break;
          case "message":
            message.set(void 0);
            break;
        }
        if (options.flashMessage && (options.clearOnSubmit == "errors-and-message" || options.clearOnSubmit == "message") && shouldSyncFlash(options)) {
          options.flashMessage.module.getFlash(page).set(void 0);
        }
        const submitData = "formData" in submit ? submit.formData : submit.data;
        lastChanges.set([]);
        if (options.SPA) {
          cancel(false);
          const validationResult = { ...validation, posted: true };
          const result = {
            type: validationResult.valid ? "success" : "failure",
            status: validationResult.valid ? 200 : typeof options.SPA == "object" ? options.SPA?.failStatus : 400,
            data: { form: validationResult }
          };
          setTimeout(() => validationResponse({ result }), 0);
        } else if (options.dataType === "json") {
          const postData = validation.data;
          const chunks = chunkSubstr(stringify(postData), options.jsonChunkSize ?? 5e5);
          for (const chunk of chunks) {
            submitData.append("__superform_json", chunk);
          }
          Object.keys(postData).forEach((key) => {
            if (typeof submitData.get(key) === "string") {
              submitData.delete(key);
            }
          });
        }
        if (!options.SPA && !submitData.has("__superform_id")) {
          const id = get_store_value(formId);
          if (id !== void 0)
            submitData.set("__superform_id", id);
        }
      }
    }
    function chunkSubstr(str, size) {
      const numChunks = Math.ceil(str.length / size);
      const chunks = new Array(numChunks);
      for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
        chunks[i] = str.substring(o, o + size);
      }
      return chunks;
    }
    async function validationResponse(event) {
      const result = event.result.type ? event.result : {
        type: "error",
        status: 500,
        error: event.result
      };
      currentRequest = null;
      let cancelled2 = false;
      const data2 = {
        result,
        formEl,
        cancel: () => cancelled2 = true
      };
      for (const event2 of formEvents.onResult) {
        await event2(data2);
      }
      if (!cancelled2) {
        if ((result.type === "success" || result.type == "failure") && result.data) {
          const forms = Context_findValidationForms(result.data);
          if (!forms.length) {
            throw new SuperFormError("No form data returned from ActionResult. Make sure you return { form } in the form actions.");
          }
          for (const newForm of forms) {
            if (newForm.id !== get_store_value(formId))
              continue;
            const data3 = {
              form: newForm,
              formEl,
              cancel: () => cancelled2 = true
            };
            for (const event2 of formEvents.onUpdate) {
              await event2(data3);
            }
            if (!cancelled2 && options.customValidity) {
              setCustomValidityForm(formEl, data3.form.errors);
            }
          }
        }
        if (!cancelled2) {
          if (result.type !== "error") {
            if (result.type === "success" && options.invalidateAll) {
              await invalidateAll();
            }
            if (options.applyAction) {
              await applyAction();
            } else {
              await Form_updateFromActionResult(result);
            }
          } else {
            if (options.applyAction) {
              if (options.onError == "apply") {
                await applyAction();
              } else {
                ({
                  type: "failure",
                  status: Math.floor(result.status || 500),
                  data: result
                });
                await applyAction();
              }
            }
            if (options.onError !== "apply") {
              const data3 = { result, message };
              for (const onErrorEvent of formEvents.onError) {
                if (onErrorEvent !== "apply" && (onErrorEvent != defaultOnError || !options.flashMessage?.onError)) {
                  await onErrorEvent(data3);
                }
              }
            }
          }
          if (options.flashMessage) {
            if (result.type == "error" && options.flashMessage.onError) {
              await options.flashMessage.onError({
                result,
                message: options.flashMessage.module.getFlash(page)
              });
            }
          }
        }
      }
      if (cancelled2 && options.flashMessage) {
        cancelFlash(options);
      }
      if (cancelled2 || result.type != "redirect") {
        htmlForm.completed(cancelled2);
      } else if (result.type == "redirect") {
        if (new URL(result.location, /^https?:\/\//.test(result.location) ? void 0 : document.location.origin).pathname == document.location.pathname) {
          setTimeout(() => {
            htmlForm.completed(true, true);
          }, 0);
        } else {
          const unsub = navigating.subscribe(($nav) => {
            if ($nav)
              return;
            unsub();
            htmlForm.completed(cancelled2);
          });
        }
      }
    }
    return validationResponse;
  });
}
const defaultOnError = (event) => {
  console.warn("Unhandled Superform error, use onError event to handle it:", event.result.error);
};
const defaultFormOptions = {
  applyAction: true,
  invalidateAll: true,
  resetForm: false,
  autoFocusOnError: "detect",
  scrollToError: "smooth",
  errorSelector: '[aria-invalid="true"],[data-invalid]',
  selectErrorText: false,
  stickyNavbar: void 0,
  taintedMessage: "Do you want to leave this page? Changes you made may not be saved.",
  onSubmit: void 0,
  onResult: void 0,
  onUpdate: void 0,
  onUpdated: void 0,
  onError: defaultOnError,
  dataType: "form",
  validators: void 0,
  defaultValidator: "keep",
  customValidity: false,
  clearOnSubmit: "errors-and-message",
  delayMs: 500,
  timeoutMs: 8e3,
  multipleSubmits: "prevent",
  validation: void 0,
  SPA: void 0,
  validateMethod: "auto"
};
const formIds = /* @__PURE__ */ new WeakMap();
const initializedForms = /* @__PURE__ */ new WeakMap();
function multipleFormIdError(id) {
  return `Duplicate form id's found: "${id}". Multiple forms will receive the same data. Use the id option to differentiate between them, or if this is intended, set the warnings.duplicateId option to false in superForm to disable this warning. More information: https://superforms.rocks/concepts/multiple-forms`;
}
function superForm(form, options = {}) {
  {
    options = {
      ...defaultFormOptions,
      ...options
    };
    if (options.SPA && options.validators === void 0) {
      console.warn("No validators set for superForm in SPA mode. Add them to the validators option, or set it to false to disable this warning.");
    }
  }
  let _formId = options.id;
  if (!form || Context_isValidationObject(form) === false) {
    if (options.warnings?.noValidationAndConstraints !== false) {
      console.warn((form ? "Form data sent directly to superForm instead of through superValidate. No initial data validation is made. " : "No form data sent to superForm, schema type safety cannot be guaranteed. ") + "Also, no constraints will exist for the form. Set the warnings.noValidationAndConstraints option to false to disable this warning.");
    }
    form = {
      valid: false,
      posted: false,
      errors: {},
      data: form ?? {},
      constraints: {}
    };
  } else {
    if (_formId === void 0)
      _formId = form.id;
  }
  const _initialFormId = _formId;
  const _currentPage = get_store_value(page);
  if (options.warnings?.duplicateId !== false) {
    if (!formIds.has(_currentPage)) {
      formIds.set(_currentPage, /* @__PURE__ */ new Set([_initialFormId]));
    } else {
      const currentForms = formIds.get(_currentPage);
      if (currentForms?.has(_initialFormId)) {
        console.warn(multipleFormIdError(_initialFormId));
      } else {
        currentForms?.add(_initialFormId);
      }
    }
  }
  if (!initializedForms.has(form)) {
    initializedForms.set(form, clone$1(form));
  }
  const initialForm = initializedForms.get(form);
  if (typeof initialForm.valid !== "boolean") {
    throw new SuperFormError("A non-validation object was passed to superForm. It should be an object of type SuperValidated, usually returned from superValidate.");
  }
  const postedData = _currentPage.form;
  if (postedData && typeof postedData === "object") {
    for (const postedForm of Context_findValidationForms(postedData).reverse()) {
      if (postedForm.id === _formId && !initializedForms.has(postedForm)) {
        initializedForms.set(postedData, postedData);
        const pageDataForm = form;
        form = postedForm;
        if (form.valid && options.resetForm && (options.resetForm === true || options.resetForm())) {
          form = clone$1(pageDataForm);
          form.message = clone$1(postedForm.message);
        }
        break;
      }
    }
  } else {
    form = clone$1(initialForm);
  }
  const form2 = form;
  const _errors = writable(form2.errors);
  const FormId = writable(_formId);
  const Context = {
    taintedMessage: options.taintedMessage,
    taintedFormState: clone$1(initialForm.data)
  };
  function Context_randomId(length = 8) {
    return Math.random().toString(36).substring(2, length + 2);
  }
  function Context_setTaintedFormState(data) {
    Context.taintedFormState = clone$1(data);
  }
  function Context_findValidationForms(data) {
    const forms = Object.values(data).filter((v) => Context_isValidationObject(v) !== false);
    return forms;
  }
  function Context_isValidationObject(object) {
    if (!object || typeof object !== "object")
      return false;
    if (!("valid" in object && "errors" in object && typeof object.valid === "boolean")) {
      return false;
    }
    return "id" in object && typeof object.id === "string" ? object.id : void 0;
  }
  function Context_useEnhanceEnabled() {
    options.taintedMessage = Context.taintedMessage;
    if (_formId === void 0)
      FormId.set(Context_randomId());
  }
  function Context_newFormStore(data) {
    const _formData = writable(data);
    return {
      subscribe: _formData.subscribe,
      set: (value, options2 = {}) => {
        Tainted_update(value, Context.taintedFormState, options2.taint ?? true);
        Context_setTaintedFormState(value);
        return _formData.set(clone$1(value));
      },
      update: (updater, options2 = {}) => {
        return _formData.update((value) => {
          const output = updater(value);
          Tainted_update(output, Context.taintedFormState, options2.taint ?? true);
          Context_setTaintedFormState(output);
          return output;
        });
      }
    };
  }
  const Unsubscriptions = [
    FormId.subscribe((id) => _formId = id)
  ];
  function Unsubscriptions_unsubscribe() {
    Unsubscriptions.forEach((unsub) => unsub());
  }
  const Form2 = Context_newFormStore(form2.data);
  function Form_checkForNestedData(key, value) {
    if (!value || typeof value !== "object")
      return;
    if (Array.isArray(value)) {
      if (value.length > 0)
        Form_checkForNestedData(key, value[0]);
    } else if (!(value instanceof Date)) {
      throw new SuperFormError(`Object found in form field "${key}". Set the dataType option to "json" and add use:enhance to use nested data structures. More information: https://superforms.rocks/concepts/nested-data`);
    }
  }
  async function Form_updateFromValidation(form3, untaint) {
    if (form3.valid && untaint && options.resetForm && (options.resetForm === true || options.resetForm())) {
      Form_reset(form3.message);
    } else {
      rebind(form3, untaint);
    }
    if (formEvents.onUpdated.length) {
      await tick();
    }
    for (const event of formEvents.onUpdated) {
      event({ form: form3 });
    }
  }
  function Form_reset(message, data, id) {
    const resetData = clone$1(initialForm);
    resetData.data = { ...resetData.data, ...data };
    if (id !== void 0)
      resetData.id = id;
    rebind(resetData, true, message);
  }
  const Form_updateFromActionResult = async (result, untaint) => {
    if (result.type == "error") {
      throw new SuperFormError(`ActionResult of type "${result.type}" cannot be passed to update function.`);
    }
    if (result.type == "redirect") {
      if (options.resetForm && (options.resetForm === true || options.resetForm())) {
        Form_reset();
      }
      return;
    }
    if (typeof result.data !== "object") {
      throw new SuperFormError("Non-object validation data returned from ActionResult.");
    }
    const forms = Context_findValidationForms(result.data);
    if (!forms.length) {
      throw new SuperFormError("No form data returned from ActionResult. Make sure you return { form } in the form actions.");
    }
    for (const newForm of forms) {
      if (newForm.id !== _formId)
        continue;
      await Form_updateFromValidation(newForm, untaint ?? (result.status >= 200 && result.status < 300));
    }
  };
  const LastChanges = writable([]);
  const Message = writable(form2.message);
  const Constraints = writable(form2.constraints);
  const Posted = writable(false);
  const Errors = {
    subscribe: _errors.subscribe,
    set: _errors.set,
    update: _errors.update,
    /**
     * To work with client-side validation, errors cannot be deleted but must
     * be set to undefined, to know where they existed before (tainted+error check in oninput)
     */
    clear: () => clearErrors(_errors, {
      undefinePath: null,
      clearFormLevelErrors: true
    })
  };
  const Tainted = writable();
  async function Tainted__validate(path, taint) {
    let shouldValidate = options.validationMethod === "oninput";
    if (!shouldValidate) {
      const errorContent = get_store_value(Errors);
      const errorNode = errorContent ? pathExists(errorContent, path, {
        modifier: (pathData) => {
          if (isInvalidPath(path, pathData)) {
            throw new SuperFormError("Errors can only be added to form fields, not to arrays or objects in the schema. Path: " + pathData.path.slice(0, -1));
          }
          return pathData.value;
        }
      }) : void 0;
      const hasError = errorNode && errorNode.key in errorNode.parent;
      shouldValidate = !!hasError;
    }
    if (shouldValidate) {
      await validateField(path, options, Form2, Errors, Tainted, { taint });
      return true;
    } else {
      return false;
    }
  }
  async function Tainted_update(newObj, compareAgainst, taintOptions) {
    if (taintOptions == "ignore")
      return;
    let paths = comparePaths(newObj, compareAgainst);
    if (typeof taintOptions === "object") {
      if (typeof taintOptions.fields === "string")
        taintOptions.fields = [taintOptions.fields];
      paths = taintOptions.fields.map((path) => splitPath(path));
      taintOptions = true;
    }
    LastChanges.set(paths);
    if (paths.length) {
      if (taintOptions === "untaint-all") {
        Tainted.set(void 0);
      } else {
        Tainted.update((tainted) => {
          if (taintOptions !== true && tainted) {
            const _tainted = tainted;
            paths = paths.filter((path) => pathExists(_tainted, path));
            if (paths.length) {
              if (!tainted)
                tainted = {};
              setPaths(tainted, paths, void 0);
            }
          } else if (taintOptions === true) {
            if (!tainted)
              tainted = {};
            setPaths(tainted, paths, true);
          }
          return tainted;
        });
      }
      if (!(options.validationMethod == "onblur" || options.validationMethod == "submit-only")) {
        let updated = false;
        for (const path of paths) {
          updated = updated || await Tainted__validate(path, taintOptions);
        }
        if (!updated) {
          await validateObjectErrors(options, Form2, Errors, get_store_value(Tainted));
        }
      }
    }
  }
  function Tainted_set(tainted, newData) {
    Tainted.set(tainted);
    Context_setTaintedFormState(newData);
  }
  const Submitting = writable(false);
  const Delayed = writable(false);
  const Timeout = writable(false);
  const AllErrors = derived(Errors, ($errors) => {
    if (!$errors)
      return [];
    return flattenErrors($errors);
  });
  options.taintedMessage = void 0;
  onDestroy(() => {
    Unsubscriptions_unsubscribe();
    for (const events of Object.values(formEvents)) {
      events.length = 0;
    }
    formIds.get(_currentPage)?.delete(_initialFormId);
  });
  if (options.dataType !== "json") {
    for (const [key, value] of Object.entries(form2.data)) {
      Form_checkForNestedData(key, value);
    }
  }
  function rebind(form3, untaint, message) {
    if (untaint) {
      Tainted_set(typeof untaint === "boolean" ? void 0 : untaint, form3.data);
    }
    message = message ?? form3.message;
    Form2.set(form3.data, { taint: "ignore" });
    Message.set(message);
    Errors.set(form3.errors);
    FormId.set(form3.id);
    Posted.set(form3.posted);
    if (options.flashMessage && shouldSyncFlash(options)) {
      const flash = options.flashMessage.module.getFlash(page);
      if (message && get_store_value(flash) === void 0) {
        flash.set(message);
      }
    }
  }
  const formEvents = {
    onSubmit: options.onSubmit ? [options.onSubmit] : [],
    onResult: options.onResult ? [options.onResult] : [],
    onUpdate: options.onUpdate ? [options.onUpdate] : [],
    onUpdated: options.onUpdated ? [options.onUpdated] : [],
    onError: options.onError ? [options.onError] : []
  };
  const Fields = Object.fromEntries(Object.keys(initialForm.data).map((key) => {
    return [
      key,
      {
        name: key,
        value: fieldProxy(Form2, key),
        errors: fieldProxy(Errors, key),
        constraints: fieldProxy(Constraints, key)
      }
    ];
  }));
  async function validate(path, opts) {
    if (path === void 0) {
      return clientValidation(options.validators, get_store_value(Form2), _formId, get_store_value(Constraints), false);
    }
    const result = await validateField(splitPath(path), options, Form2, Errors, Tainted, opts);
    return result.errors;
  }
  return {
    form: Form2,
    formId: FormId,
    errors: Errors,
    message: Message,
    constraints: Constraints,
    fields: Fields,
    tainted: Tainted,
    submitting: derived(Submitting, ($s) => $s),
    delayed: derived(Delayed, ($d) => $d),
    timeout: derived(Timeout, ($t) => $t),
    options,
    capture: function() {
      return {
        valid: initialForm.valid,
        posted: get_store_value(Posted),
        errors: get_store_value(Errors),
        data: get_store_value(Form2),
        constraints: get_store_value(Constraints),
        message: get_store_value(Message),
        id: _formId,
        tainted: get_store_value(Tainted)
      };
    },
    restore: function(snapshot) {
      return rebind(snapshot, snapshot.tainted ?? true);
    },
    validate,
    enhance: (el, events) => {
      if (events) {
        if (events.onError) {
          if (options.onError === "apply") {
            throw new SuperFormError('options.onError is set to "apply", cannot add any onError events.');
          } else if (events.onError === "apply") {
            throw new SuperFormError('Cannot add "apply" as onError event in use:enhance.');
          }
          formEvents.onError.push(events.onError);
        }
        if (events.onResult)
          formEvents.onResult.push(events.onResult);
        if (events.onSubmit)
          formEvents.onSubmit.push(events.onSubmit);
        if (events.onUpdate)
          formEvents.onUpdate.push(events.onUpdate);
        if (events.onUpdated)
          formEvents.onUpdated.push(events.onUpdated);
      }
      return formEnhance(el, Submitting, Delayed, Timeout, Errors, Form_updateFromActionResult, options, Form2, Message, Context_useEnhanceEnabled, formEvents, FormId, Constraints, Tainted, LastChanges, Context_findValidationForms, Posted);
    },
    allErrors: AllErrors,
    posted: Posted,
    reset: (options2) => Form_reset(options2?.keepMessage ? get_store_value(Message) : void 0, options2?.data, options2?.id)
  };
}
const AuthContainer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<section class="h-screen pt-6 px-4 lg:px-6 pb-20 md:pb-32 overflow-hidden" style="background-image: linear-gradient( 135deg, hsl(240deg 5% 60%) 0%, hsl(256deg 5% 59%) 11%, hsl(272deg 5% 58%) 22%, hsl(291deg 4% 57%) 33%, hsl(311deg 5% 57%) 44%, hsl(325deg 6% 56%) 56%, hsl(336deg 6% 56%) 67%, hsl(345deg 7% 55%) 78%, hsl(353deg 7% 55%) 89%, hsl(0deg 7% 54%) 100% );"><div class="max-w-7xl pt-12 sm:pt-28 mx-auto"><div class="container px-4 mx-auto"><div class="max-w-lg md:max-w-xl py-14 px-6 xs:px-12 lg:px-16 mx-auto bg-white rounded-3xl shadow-lg">${slots.default ? slots.default({}) : ``}</div></div></div></section>`;
});
const SocialProviders = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return ``;
});
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".label.svelte-ksn0gf{margin-bottom:1rem;display:block;--tw-text-opacity:1;color:rgb(75 85 99 / var(--tw-text-opacity))\n}.label-text.svelte-ksn0gf{margin-left:0.25rem;margin-bottom:0.5rem;font-size:0.875rem;line-height:1.25rem;font-weight:600\n}.input.svelte-ksn0gf{display:block;width:100%;border-radius:0.5rem;border-width:1px;--tw-border-opacity:1;border-color:rgb(229 231 235 / var(--tw-border-opacity));padding-top:0.75rem;padding-bottom:0.75rem;padding-left:1rem;padding-right:1rem;font-size:0.875rem;line-height:1.25rem;--tw-text-opacity:1;color:rgb(55 65 81 / var(--tw-text-opacity))\n}.input.svelte-ksn0gf::-moz-placeholder{--tw-placeholder-opacity:1;color:rgb(156 163 175 / var(--tw-placeholder-opacity))\n}.input.svelte-ksn0gf::placeholder{--tw-placeholder-opacity:1;color:rgb(156 163 175 / var(--tw-placeholder-opacity))\n}.input.svelte-ksn0gf:focus{--tw-border-opacity:1;border-color:rgb(107 114 128 / var(--tw-border-opacity));outline:2px solid transparent;outline-offset:2px;--tw-ring-opacity:1;--tw-ring-color:rgb(107 114 128 / var(--tw-ring-opacity))\n}.invalid.svelte-ksn0gf{margin-top:0.5rem;margin-bottom:0.5rem;display:block;font-size:0.875rem;line-height:1.25rem;--tw-text-opacity:1;color:rgb(220 38 38 / var(--tw-text-opacity))\n}.button.svelte-ksn0gf{margin-top:1rem;margin-bottom:1rem;display:inline-block;width:100%;border-radius:0.375rem;--tw-bg-opacity:1;background-color:rgb(79 70 229 / var(--tw-bg-opacity));padding-top:0.75rem;padding-bottom:0.75rem;padding-left:1.25rem;padding-right:1.25rem;font-size:0.875rem;line-height:1.25rem;font-weight:600;--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity));transition-property:color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, -webkit-backdrop-filter;transition-property:color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;transition-property:color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, -webkit-backdrop-filter;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:200ms\n}.button.svelte-ksn0gf:hover{--tw-bg-opacity:1;background-color:rgb(67 56 202 / var(--tw-bg-opacity))\n}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $resetForm, $$unsubscribe_resetForm;
  let $forgotForm, $$unsubscribe_forgotForm;
  let $registerForm, $$unsubscribe_registerForm;
  let $loginForm, $$unsubscribe_loginForm;
  let $loginErrors, $$unsubscribe_loginErrors;
  let $loginMessage, $$unsubscribe_loginMessage;
  let $registerErrors, $$unsubscribe_registerErrors;
  let $registerMessage, $$unsubscribe_registerMessage;
  let $forgotMessage, $$unsubscribe_forgotMessage;
  let $page, $$unsubscribe_page;
  let $forgotErrors, $$unsubscribe_forgotErrors;
  let $resetErrors, $$unsubscribe_resetErrors;
  let $resetMessage, $$unsubscribe_resetMessage;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { data } = $$props;
  let state = data.code ? "reset" : "signin";
  let token = "no-token-required";
  const { form: loginForm, errors: loginErrors, message: loginMessage, enhance: loginEnhance } = superForm(data.loginForm, {
    validators: loginPostReq,
    invalidateAll: true,
    onUpdate: () => {
      token = token === "no-token-required" ? "no-token-required" : "";
    },
    taintedMessage: null
  });
  $$unsubscribe_loginForm = subscribe(loginForm, (value) => $loginForm = value);
  $$unsubscribe_loginErrors = subscribe(loginErrors, (value) => $loginErrors = value);
  $$unsubscribe_loginMessage = subscribe(loginMessage, (value) => $loginMessage = value);
  const { form: registerForm, errors: registerErrors, message: registerMessage, enhance: registerEnhance } = superForm(data.registerForm, {
    validators: registerPostReq,
    invalidateAll: true,
    onUpdate: () => {
      token = token === "no-token-required" ? "no-token-required" : "";
    },
    taintedMessage: null
  });
  $$unsubscribe_registerForm = subscribe(registerForm, (value) => $registerForm = value);
  $$unsubscribe_registerErrors = subscribe(registerErrors, (value) => $registerErrors = value);
  $$unsubscribe_registerMessage = subscribe(registerMessage, (value) => $registerMessage = value);
  const { form: forgotForm, errors: forgotErrors, message: forgotMessage, enhance: forgotEnhance } = superForm(data.forgotForm, {
    validators: forgotPostReq,
    invalidateAll: true,
    onUpdate: () => {
      token = token === "no-token-required" ? "no-token-required" : "";
    },
    taintedMessage: null
  });
  $$unsubscribe_forgotForm = subscribe(forgotForm, (value) => $forgotForm = value);
  $$unsubscribe_forgotErrors = subscribe(forgotErrors, (value) => $forgotErrors = value);
  $$unsubscribe_forgotMessage = subscribe(forgotMessage, (value) => $forgotMessage = value);
  const { form: resetForm, errors: resetErrors, message: resetMessage, enhance: resetEnhance } = superForm(data.resetForm, {
    validators: resetPostReq,
    invalidateAll: true,
    onUpdate: () => {
      token = token === "no-token-required" ? "no-token-required" : "";
    },
    taintedMessage: null
  });
  $$unsubscribe_resetForm = subscribe(resetForm, (value) => $resetForm = value);
  $$unsubscribe_resetErrors = subscribe(resetErrors, (value) => $resetErrors = value);
  $$unsubscribe_resetMessage = subscribe(resetMessage, (value) => $resetMessage = value);
  set_store_value(resetForm, $resetForm.code = data.code, $resetForm);
  set_store_value(loginForm, $loginForm.rurl = data.rurl || "", $loginForm);
  set_store_value(registerForm, $registerForm.rurl = data.rurl || "", $registerForm);
  set_store_value(forgotForm, $forgotForm.rurl = data.rurl || "", $forgotForm);
  set_store_value(resetForm, $resetForm.rurl = data.rurl || "", $resetForm);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  set_store_value(loginForm, $loginForm.token = token, $loginForm);
  set_store_value(registerForm, $registerForm.token = token, $registerForm);
  set_store_value(forgotForm, $forgotForm.token = token, $forgotForm);
  set_store_value(resetForm, $resetForm.token = token, $resetForm);
  $$unsubscribe_resetForm();
  $$unsubscribe_forgotForm();
  $$unsubscribe_registerForm();
  $$unsubscribe_loginForm();
  $$unsubscribe_loginErrors();
  $$unsubscribe_loginMessage();
  $$unsubscribe_registerErrors();
  $$unsubscribe_registerMessage();
  $$unsubscribe_forgotMessage();
  $$unsubscribe_page();
  $$unsubscribe_forgotErrors();
  $$unsubscribe_resetErrors();
  $$unsubscribe_resetMessage();
  return `${validate_component(AuthContainer, "AuthContainer").$$render($$result, {}, {}, {
    default: () => {
      return `${!token ? `${validate_component(Turnstile, "Turnstile").$$render(
        $$result,
        {
          theme: "light",
          siteKey: PUBLIC_TURNSTILE_SITE_KEY
        },
        {},
        {}
      )}` : `${state === "signin" ? `<h3 class="font-heading text-3xl text-gray-900 font-semibold text-center mb-4" data-svelte-h="svelte-g0lfv2">Sign In to Your Account</h3> <p class="text-lg text-gray-500 mb-10" data-svelte-h="svelte-t709cv">If you have an existing account, enter your email and password below.</p> <form action="?/login" method="POST"><input type="hidden" name="rurl"${add_attribute("value", $loginForm.rurl, 0)}> <input type="hidden" name="token"${add_attribute("value", $loginForm.token, 0)}> <label class="label svelte-ksn0gf"><div class="label-text svelte-ksn0gf" data-svelte-h="svelte-b4ldiz">Email</div> <input name="email" type="email" autocomplete="email" class="input svelte-ksn0gf"${add_attribute("aria-invalid", $loginErrors.email ? "true" : void 0, 0)}${add_attribute("value", $loginForm.email, 0)}> ${$loginErrors.email ? `<span class="invalid svelte-ksn0gf">${escape($loginErrors.email)}</span>` : ``}</label> <label class="label svelte-ksn0gf"><div class="label-text svelte-ksn0gf" data-svelte-h="svelte-uye2wo">Password</div> <input name="password" type="password" autocomplete="current-password" class="input svelte-ksn0gf"${add_attribute("aria-invalid", $loginErrors.password ? "true" : void 0, 0)}${add_attribute("value", $loginForm.password, 0)}> ${$loginErrors.password ? `<span class="invalid svelte-ksn0gf">${escape($loginErrors.password)}</span>` : ``}</label> ${$loginMessage ? `<div class="mt-2 text-sm text-red-600">${escape($loginMessage)}</div>` : ``} <button type="submit" class="button svelte-ksn0gf" data-svelte-h="svelte-rm8x">Login</button> ${validate_component(SocialProviders, "SocialProviders").$$render($$result, {}, {}, {})} <div class="pt-6 text-sm text-center font-medium"><span data-svelte-h="svelte-19ldecv">Don&#39;t have an account?  </span> <button type="button" class="text-orange-900 hover:text-orange-700" data-svelte-h="svelte-5rj4x4">Sign Up</button></div> <div class="text-sm text-center font-medium"><button type="button" class="mt-4 text-gray-900 hover:text-gray-700" data-svelte-h="svelte-cwqgtp">Forgot your password?</button></div></form>` : `${state === "signup" ? `<h3 class="font-heading text-3xl text-gray-900 font-semibold text-center mb-4" data-svelte-h="svelte-496vax">Create an Account</h3> <p class="text-lg text-gray-500 mb-10" data-svelte-h="svelte-1po6tc2">Welcome! To create an account, please enter your email and choose a password below.</p> <form action="?/register" method="POST"><input type="hidden" name="rurl"${add_attribute("value", $registerForm.rurl, 0)}> <input type="hidden" name="token"${add_attribute("value", $registerForm.token, 0)}> <label class="label svelte-ksn0gf"><div class="label-text svelte-ksn0gf" data-svelte-h="svelte-ew7vts">First Name</div> <input name="firstName" type="text" autocomplete="given-name" class="input svelte-ksn0gf"${add_attribute("aria-invalid", $registerErrors.firstName ? "true" : void 0, 0)}${add_attribute("value", $registerForm.firstName, 0)}> ${$registerErrors.firstName ? `<span class="invalid svelte-ksn0gf">${escape($registerErrors.firstName)}</span>` : ``}</label> <label class="label svelte-ksn0gf"><div class="label-text svelte-ksn0gf" data-svelte-h="svelte-a11l56">Last Name</div> <input name="lastName" type="text" autocomplete="family-name" class="input svelte-ksn0gf"${add_attribute("aria-invalid", $registerErrors.lastName ? "true" : void 0, 0)}${add_attribute("value", $registerForm.lastName, 0)}> ${$registerErrors.lastName ? `<span class="invalid svelte-ksn0gf">${escape($registerErrors.lastName)}</span>` : ``}</label> <label class="label svelte-ksn0gf"><div class="label-text svelte-ksn0gf" data-svelte-h="svelte-b4ldiz">Email</div> <input name="email" type="email" autocomplete="email" class="input svelte-ksn0gf"${add_attribute("aria-invalid", $registerErrors.email ? "true" : void 0, 0)}${add_attribute("value", $registerForm.email, 0)}> ${$registerErrors.email ? `<span class="invalid svelte-ksn0gf">${escape($registerErrors.email)}</span>` : ``}</label> <label class="label svelte-ksn0gf"><div class="label-text svelte-ksn0gf" data-svelte-h="svelte-uye2wo">Password</div> <input name="password" type="password" autocomplete="new-password" class="input svelte-ksn0gf"${add_attribute("aria-invalid", $registerErrors.password ? "true" : void 0, 0)}${add_attribute("value", $registerForm.password, 0)}> ${$registerErrors.password ? `<span class="invalid svelte-ksn0gf">${escape($registerErrors.password)}</span>` : ``}</label> <label class="label svelte-ksn0gf"><div class="label-text svelte-ksn0gf" data-svelte-h="svelte-1008ihs">Confirm Password</div> <input name="passwordConfirm" type="password" autocomplete="new-password" class="input svelte-ksn0gf"${add_attribute("aria-invalid", $registerErrors.passwordConfirm ? "true" : void 0, 0)}${add_attribute("value", $registerForm.passwordConfirm, 0)}> ${$registerErrors.passwordConfirm ? `<span class="invalid svelte-ksn0gf">${escape($registerErrors.passwordConfirm)}</span>` : ``}</label> ${$registerMessage ? `<div class="mt-2 text-sm text-red-600">${escape($registerMessage)}</div>` : ``} <button type="submit" class="button svelte-ksn0gf" data-svelte-h="svelte-5crfet">Create Account</button> ${validate_component(SocialProviders, "SocialProviders").$$render($$result, {}, {}, {})} <div class="pt-6 text-sm text-center font-medium"><span data-svelte-h="svelte-m1g6u5">Already have an account?  </span> <button type="button" class="text-orange-900 hover:text-orange-700" data-svelte-h="svelte-2be454">Sign In</button></div></form>` : `${state === "forgot" ? `${$forgotMessage ? `<div class="${["mt-2 text-sm", $page.status > 200 ? "text-red-600" : ""].join(" ").trim()}">${escape($forgotMessage)}</div>` : `<p class="my-4 text-center font-medium" data-svelte-h="svelte-l2np03">Enter your email address</p> <form action="?/forgot" method="POST"><input type="hidden" name="rurl"${add_attribute("value", $forgotForm.rurl, 0)}> <input type="hidden" name="token"${add_attribute("value", $forgotForm.token, 0)}> <label class="label svelte-ksn0gf"><div class="label-text svelte-ksn0gf" data-svelte-h="svelte-b4ldiz">Email</div> <input name="email" type="email" autocomplete="email" class="input svelte-ksn0gf"${add_attribute("aria-invalid", $forgotErrors.email ? "true" : void 0, 0)}${add_attribute("value", $forgotForm.email, 0)}> ${$forgotErrors.email ? `<span class="invalid svelte-ksn0gf">${escape($forgotErrors.email)}</span>` : ``}</label> <button type="submit" class="button svelte-ksn0gf" data-svelte-h="svelte-1g58jod">Request Reset Code</button></form>`}` : `${state === "reset" ? `<p class="my-4 text-center font-medium" data-svelte-h="svelte-1ct529">Choose a new password</p> <form action="?/reset" method="POST"><input type="hidden" name="rurl"${add_attribute("value", $resetForm.rurl, 0)}> <input type="hidden" name="token"${add_attribute("value", $resetForm.token, 0)}> <input type="hidden" name="code"${add_attribute("value", $resetForm.code, 0)}> <label class="label svelte-ksn0gf"><div class="label-text svelte-ksn0gf" data-svelte-h="svelte-b4ldiz">Email</div> <input name="email" type="email" autocomplete="email" class="input svelte-ksn0gf"${add_attribute("aria-invalid", $resetErrors.email ? "true" : void 0, 0)}${add_attribute("value", $resetForm.email, 0)}> ${$resetErrors.email ? `<span class="invalid svelte-ksn0gf">${escape($resetErrors.email)}</span>` : ``}</label> <label class="label svelte-ksn0gf"><div class="label-text svelte-ksn0gf" data-svelte-h="svelte-uye2wo">Password</div> <input name="password" type="password" autocomplete="new-password" class="input svelte-ksn0gf"${add_attribute("aria-invalid", $resetErrors.password ? "true" : void 0, 0)}${add_attribute("value", $resetForm.password, 0)}> ${$resetErrors.password ? `<span class="invalid svelte-ksn0gf">${escape($resetErrors.password)}</span>` : ``}</label> <label class="label svelte-ksn0gf"><div class="label-text svelte-ksn0gf" data-svelte-h="svelte-1008ihs">Confirm Password</div> <input name="passwordConfirm" type="password" autocomplete="new-password" class="input svelte-ksn0gf"${add_attribute("aria-invalid", $resetErrors.passwordConfirm ? "true" : void 0, 0)}${add_attribute("value", $resetForm.passwordConfirm, 0)}> ${$resetErrors.passwordConfirm ? `<span class="invalid svelte-ksn0gf">${escape($resetErrors.passwordConfirm)}</span>` : ``}</label> ${$resetMessage ? `<div class="mt-2 text-sm text-red-600">${escape($resetMessage)}</div>` : ``} <button type="submit" class="button svelte-ksn0gf" data-svelte-h="svelte-1r5iq1o">Save New Password</button></form>` : ``}`}`}`}`}`;
    }
  })}`;
});
export {
  Page as default
};
