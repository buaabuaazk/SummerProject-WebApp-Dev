<template>
  <!--
      This example requires updating your template:
  
      ```
      <html class="h-full">
      <body class="h-full">
      ```
    -->
  <div>
    <main class="grid h-dvh place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div class="text-center">
        <p class="text-base font-semibold text-indigo-600">404</p>
        <h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">页面不存在</h1>
        <p class="mt-6 text-base leading-7 text-gray-600">
          对不起，您并没有加入任何企业，或许你可以尝试创建企业👇🏻
        </p>
        <div class="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="#"
            class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            @click="openModal"
            >创建企业</a
          >
          <a href="#" class="text-sm font-semibold text-gray-900"
            >联系帮助 <span aria-hidden="true">&rarr;</span></a
          >
        </div>
      </div>
    </main>
    <div>
      <TransitionRoot :show="isOpen" as="template">
        <Dialog as="div" class="relative z-50" @close="closeModal">
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div class="fixed inset-0 bg-black bg-opacity-25" />
          </TransitionChild>

          <div class="fixed inset-0 overflow-y-auto">
            <div class="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as="template"
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel
                  class="min-w-[60%] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
                >
                  <DialogTitle as="h3" class="text-lg font-semibold leading-6 text-gray-900">
                    创建企业
                  </DialogTitle>

                  <form @submit.prevent>
                    <div class="space-y-12">
                      <div class="border-b border-gray-900/10 pb-12">
                        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                          <div class="sm:col-span-4">
                            <label
                              for="username"
                              class="block text-sm font-medium leading-6 text-gray-900"
                              >企业名称</label
                            >
                            <div class="mt-2">
                              <div
                                class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
                              >
                                <span
                                  class="flex select-none items-center pl-3 text-gray-500 sm:text-sm"
                                  >workcation.com/</span
                                >
                                <input
                                  type="text"
                                  name="username"
                                  id="username"
                                  autocomplete="username"
                                  class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                  placeholder="janesmith"
                                  v-model="formData.enterprise_name"
                                  required
                                />
                              </div>
                            </div>
                          </div>

                          <div class="col-span-full">
                            <label
                              for="about"
                              class="block text-sm font-medium leading-6 text-gray-900"
                              >企业简介</label
                            >
                            <div class="mt-2">
                              <textarea
                                id="about"
                                name="about"
                                rows="3"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                v-model="formData.enterprise_description"
                                required
                              />
                            </div>
                            <p class="mt-3 text-sm leading-6 text-gray-600">
                              Write a few sentences about your company.
                            </p>
                          </div>

                          <div class="col-span-full">
                            <label
                              for="cover-photo"
                              class="block text-sm font-medium leading-6 text-gray-900"
                              >Cover photo</label
                            >
                            <div
                              class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10"
                            >
                              <div class="text-center">
                                <PhotoIcon
                                  class="mx-auto h-12 w-12 text-gray-300"
                                  aria-hidden="true"
                                />
                                <div class="mt-4 flex text-sm leading-6 text-gray-600">
                                  <label
                                    for="file-upload"
                                    class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                  >
                                    <span>Upload a file</span>
                                    <input
                                      id="file-upload"
                                      name="file-upload"
                                      type="file"
                                      class="sr-only"
                                    />
                                  </label>
                                  <p class="pl-1">or drag and drop</p>
                                </div>
                                <p class="text-xs leading-5 text-gray-600">
                                  PNG, JPG, GIF up to 10MB
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <!-- <div class="border-b border-gray-900/10 pb-12">
                        <h2 class="text-base font-semibold leading-7 text-gray-900">
                          Personal Information
                        </h2>
                        <p class="mt-1 text-sm leading-6 text-gray-600">
                          Use a permanent address where you can receive mail.
                        </p>

                        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                          <div class="sm:col-span-3">
                            <label
                              for="first-name"
                              class="block text-sm font-medium leading-6 text-gray-900"
                              >First name</label
                            >
                            <div class="mt-2">
                              <input
                                type="text"
                                name="first-name"
                                id="first-name"
                                autocomplete="given-name"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div class="sm:col-span-3">
                            <label
                              for="last-name"
                              class="block text-sm font-medium leading-6 text-gray-900"
                              >Last name</label
                            >
                            <div class="mt-2">
                              <input
                                type="text"
                                name="last-name"
                                id="last-name"
                                autocomplete="family-name"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div class="sm:col-span-4">
                            <label
                              for="email"
                              class="block text-sm font-medium leading-6 text-gray-900"
                              >Email address</label
                            >
                            <div class="mt-2">
                              <input
                                id="email"
                                name="email"
                                type="email"
                                autocomplete="email"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div class="sm:col-span-3">
                            <label
                              for="country"
                              class="block text-sm font-medium leading-6 text-gray-900"
                              >Country</label
                            >
                            <div class="mt-2">
                              <select
                                id="country"
                                name="country"
                                autocomplete="country-name"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                              >
                                <option>United States</option>
                                <option>Canada</option>
                                <option>Mexico</option>
                              </select>
                            </div>
                          </div>

                          <div class="col-span-full">
                            <label
                              for="street-address"
                              class="block text-sm font-medium leading-6 text-gray-900"
                              >Street address</label
                            >
                            <div class="mt-2">
                              <input
                                type="text"
                                name="street-address"
                                id="street-address"
                                autocomplete="street-address"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div class="sm:col-span-2 sm:col-start-1">
                            <label
                              for="city"
                              class="block text-sm font-medium leading-6 text-gray-900"
                              >City</label
                            >
                            <div class="mt-2">
                              <input
                                type="text"
                                name="city"
                                id="city"
                                autocomplete="address-level2"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div class="sm:col-span-2">
                            <label
                              for="region"
                              class="block text-sm font-medium leading-6 text-gray-900"
                              >State / Province</label
                            >
                            <div class="mt-2">
                              <input
                                type="text"
                                name="region"
                                id="region"
                                autocomplete="address-level1"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div class="sm:col-span-2">
                            <label
                              for="postal-code"
                              class="block text-sm font-medium leading-6 text-gray-900"
                              >ZIP / Postal code</label
                            >
                            <div class="mt-2">
                              <input
                                type="text"
                                name="postal-code"
                                id="postal-code"
                                autocomplete="postal-code"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="border-b border-gray-900/10 pb-12">
                        <h2 class="text-base font-semibold leading-7 text-gray-900">
                          Notifications
                        </h2>
                        <p class="mt-1 text-sm leading-6 text-gray-600">
                          We'll always let you know about important changes, but you pick what else
                          you want to hear about.
                        </p>

                        <div class="mt-10 space-y-10">
                          <fieldset>
                            <legend class="text-sm font-semibold leading-6 text-gray-900">
                              By Email
                            </legend>
                            <div class="mt-6 space-y-6">
                              <div class="relative flex gap-x-3">
                                <div class="flex h-6 items-center">
                                  <input
                                    id="comments"
                                    name="comments"
                                    type="checkbox"
                                    class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                  />
                                </div>
                                <div class="text-sm leading-6">
                                  <label for="comments" class="font-medium text-gray-900"
                                    >Comments</label
                                  >
                                  <p class="text-gray-500">
                                    Get notified when someones posts a comment on a posting.
                                  </p>
                                </div>
                              </div>
                              <div class="relative flex gap-x-3">
                                <div class="flex h-6 items-center">
                                  <input
                                    id="candidates"
                                    name="candidates"
                                    type="checkbox"
                                    class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                  />
                                </div>
                                <div class="text-sm leading-6">
                                  <label for="candidates" class="font-medium text-gray-900"
                                    >Candidates</label
                                  >
                                  <p class="text-gray-500">
                                    Get notified when a candidate applies for a job.
                                  </p>
                                </div>
                              </div>
                              <div class="relative flex gap-x-3">
                                <div class="flex h-6 items-center">
                                  <input
                                    id="offers"
                                    name="offers"
                                    type="checkbox"
                                    class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                  />
                                </div>
                                <div class="text-sm leading-6">
                                  <label for="offers" class="font-medium text-gray-900"
                                    >Offers</label
                                  >
                                  <p class="text-gray-500">
                                    Get notified when a candidate accepts or rejects an offer.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </fieldset>
                          <fieldset>
                            <legend class="text-sm font-semibold leading-6 text-gray-900">
                              Push Notifications
                            </legend>
                            <p class="mt-1 text-sm leading-6 text-gray-600">
                              These are delivered via SMS to your mobile phone.
                            </p>
                            <div class="mt-6 space-y-6">
                              <div class="flex items-center gap-x-3">
                                <input
                                  id="push-everything"
                                  name="push-notifications"
                                  type="radio"
                                  class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                                <label
                                  for="push-everything"
                                  class="block text-sm font-medium leading-6 text-gray-900"
                                  >Everything</label
                                >
                              </div>
                              <div class="flex items-center gap-x-3">
                                <input
                                  id="push-email"
                                  name="push-notifications"
                                  type="radio"
                                  class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                                <label
                                  for="push-email"
                                  class="block text-sm font-medium leading-6 text-gray-900"
                                  >Same as email</label
                                >
                              </div>
                              <div class="flex items-center gap-x-3">
                                <input
                                  id="push-nothing"
                                  name="push-notifications"
                                  type="radio"
                                  class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                                <label
                                  for="push-nothing"
                                  class="block text-sm font-medium leading-6 text-gray-900"
                                  >No push notifications</label
                                >
                              </div>
                            </div>
                          </fieldset>
                        </div>
                      </div> -->
                    </div>

                    <div class="mt-6 flex items-center justify-end gap-x-6">
                      <button type="button" class="text-sm font-semibold leading-6 text-gray-900">
                        Cancel
                      </button>
                      <button
                        type="submit"
                        class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        @click="submit"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </TransitionRoot>
    </div>
  </div>
</template>

<script setup>
import { Dialog, DialogPanel, DialogTitle, TransitionRoot, TransitionChild } from '@headlessui/vue'
import { computed, ref } from 'vue'
import useTokenStore from '@/stores/useTokenStore'

import axios from 'axios'
import { useRouter } from 'vue-router'

const tokenStore = useTokenStore()

const router = useRouter()

let isOpen = ref(false)

function closeModal() {
  isOpen.value = false
}
function openModal() {
  isOpen.value = true
}

let formData = ref({
  enterprise_name: '',
  enterprise_logo: '',
  enterprise_description: '',
  enterprise_interested_id: [],
  enterprise_recruit_list: [],
  enterprise_field: ''
})

const submit = async () => {
  await axios
    .post('http://8.130.25.189:8000/api/enterprise/register', formData.value, {
      headers: {
        Authorization: tokenStore.getToken,
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })

  let user_id = await axios
    .get('http://8.130.25.189:8000/api/user/detail', {
      headers: {
        Authorization: tokenStore.getToken
      }
    })
    .then((res) => {
      console.log(res)
      return res.data.user_id
    })
    .catch((err) => {
      console.log(err)
    })

  console.log(user_id)

  await axios
    .get('http://8.130.25.189:8000/api/profile?user_id=' + user_id)
    .then((res) => localStorage.setItem('enterprise', res.data.enterprise))
  router.push('/CorporationInfo')
}
</script>
