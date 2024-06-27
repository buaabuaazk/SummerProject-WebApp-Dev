<!--
 * @Date: 2024-06-23 19:27:22
 * @Author: Q9K
 * @Description: 创建企业的表单页
-->
<template>
  <div>
    <TransitionRoot :show="props.isOpen" as="template">
      <Dialog as="div" class="relative z-50" @close="props.closeModal">
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
                class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
              >
                <DialogTitle as="h3" class="text-lg font-semibold leading-6 text-gray-900">
                  Edit Company Profile
                </DialogTitle>

                <form class="w-full mt-2 flex flex-col gap-5" @submit.prevent="handleSubmit">
                  <TextInput name="name" label="Company Name" type="text" />

                  <TextInput
                    name="location"
                    label="Location/Address"
                    placeholder="eg. Califonia"
                    type="text"
                  />

                  <div class="w-full flex gap-2">
                    <div class="w-1/2">
                      <TextInput
                        name="contact"
                        label="Contact"
                        placeholder="Phone Number"
                        type="text"
                      />
                    </div>

                    <div class="w-1/2 mt-2">
                      <label class="text-gray-600 text-sm mb-1">Company Logo</label>
                      <input type="file" />
                    </div>
                  </div>

                  <div class="flex flex-col">
                    <label class="text-gray-600 text-sm mb-1">About Company</label>
                    <textarea
                      class="ounded border border-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-base px-4 py-2 resize-none"
                      rows="4"
                      cols="6"
                    ></textarea>
                  </div>

                  <div className="mt-4">
                    <CustomButton
                      type="submit"
                      containerStyles="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-8 py-2 text-sm font-medium text-white hover:bg-[#1d4fd846] hover:text-[#1d4fd8] focus:outline-none "
                      title="Submit"
                    />
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup>
import { Dialog, DialogPanel, DialogTitle, TransitionRoot, TransitionChild } from '@headlessui/vue'
import { computed, ref } from 'vue'

const props = defineProps({
  isOpen: Boolean,
  openModal: Function,
  closeModal: Function
})

function handleSubmit() {}
</script>
