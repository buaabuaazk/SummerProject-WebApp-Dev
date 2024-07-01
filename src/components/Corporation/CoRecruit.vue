<template>
  <div>
    <div class="bg-white">
      <!-- form dialog -->
      <TransitionRoot :show="isOpen" as="template">
        <Dialog as="div" class="relative z-50" @close="isOpen = false">
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
                    创建招聘
                  </DialogTitle>

                  <form @submit.prevent>
                    <div class="space-y-12">
                      <div class="border-b border-gray-900/10 pb-12">
                        <p class="mt-1 text-sm leading-6 text-gray-600">
                          以下这些信息将会展示在你的招聘页面上，让求职者更好地了解你的公司。
                        </p>

                        <div class="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                          <div class="sm:col-span-4">
                            <label
                              for="username"
                              class="block text-sm font-medium leading-6 text-gray-900"
                              >职位名称</label
                            >
                            <div class="mt-2">
                              <div
                                class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
                              >
                                <span
                                  class="flex select-none items-center pl-3 text-gray-500 sm:text-sm"
                                  >岗位/</span
                                >
                                <input
                                  type="text"
                                  name="username"
                                  id="username"
                                  autocomplete="username"
                                  class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                  placeholder="例：前端工程师"
                                  v-model="formData.job_name"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="border-b border-gray-900/10 pb-12">
                        <h2 class="text-base font-semibold leading-7 text-gray-900">
                          职位详细信息
                        </h2>
                        <p class="mt-1 text-sm leading-6 text-gray-600">
                          下面是一些关于这个职位的详细信息，比如职位的薪资、工作地点等等👇🏻
                        </p>

                        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                          <div class="sm:col-span-3">
                            <label
                              for="first-name"
                              class="block text-sm font-medium leading-6 text-gray-900"
                              >工作天数(天/周)</label
                            >
                            <Listbox as="div" v-model="formData.job_day">
                              <div class="relative mt-2">
                                <ListboxButton
                                  class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                >
                                  <span class="block truncate">{{ formData.job_day.name }}</span>
                                  <span
                                    class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
                                  >
                                    <ChevronUpDownIcon
                                      class="h-5 w-5 text-gray-400"
                                      aria-hidden="true"
                                    />
                                  </span>
                                </ListboxButton>

                                <transition
                                  leave-active-class="transition ease-in duration-100"
                                  leave-from-class="opacity-100"
                                  leave-to-class="opacity-0"
                                >
                                  <ListboxOptions
                                    class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                                  >
                                    <ListboxOption
                                      as="template"
                                      v-for="day in days"
                                      :key="day.id"
                                      :value="day"
                                      v-slot="{ active, selected }"
                                    >
                                      <li
                                        :class="[
                                          active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                          'relative cursor-default select-none py-2 pl-8 pr-4'
                                        ]"
                                      >
                                        <span
                                          :class="[
                                            selected ? 'font-semibold' : 'font-normal',
                                            'block truncate'
                                          ]"
                                          >{{ day.name }}</span
                                        >

                                        <span
                                          v-if="selected"
                                          :class="[
                                            active ? 'text-white' : 'text-indigo-600',
                                            'absolute inset-y-0 left-0 flex items-center pl-1.5'
                                          ]"
                                        >
                                          <CheckIcon class="h-5 w-5" aria-hidden="true" />
                                        </span>
                                      </li>
                                    </ListboxOption>
                                  </ListboxOptions>
                                </transition>
                              </div>
                            </Listbox>
                          </div>

                          <div class="sm:col-span-3">
                            <label
                              for="last-name"
                              class="block text-sm font-medium leading-6 text-gray-900"
                              >工作月份(月/年)</label
                            >
                            <Listbox as="div" v-model="formData.job_month">
                              <div class="relative mt-2">
                                <ListboxButton
                                  class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                >
                                  <span class="block truncate">{{ formData.job_month.name }}</span>
                                  <span
                                    class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
                                  >
                                    <ChevronUpDownIcon
                                      class="h-5 w-5 text-gray-400"
                                      aria-hidden="true"
                                    />
                                  </span>
                                </ListboxButton>

                                <transition
                                  leave-active-class="transition ease-in duration-100"
                                  leave-from-class="opacity-100"
                                  leave-to-class="opacity-0"
                                >
                                  <ListboxOptions
                                    class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                                  >
                                    <ListboxOption
                                      as="template"
                                      v-for="month in months"
                                      :key="month.id"
                                      :value="month"
                                      v-slot="{ active, selected }"
                                    >
                                      <li
                                        :class="[
                                          active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                          'relative cursor-default select-none py-2 pl-8 pr-4'
                                        ]"
                                      >
                                        <span
                                          :class="[
                                            selected ? 'font-semibold' : 'font-normal',
                                            'block truncate'
                                          ]"
                                          >{{ month.name }}</span
                                        >

                                        <span
                                          v-if="selected"
                                          :class="[
                                            active ? 'text-white' : 'text-indigo-600',
                                            'absolute inset-y-0 left-0 flex items-center pl-1.5'
                                          ]"
                                        >
                                          <CheckIcon class="h-5 w-5" aria-hidden="true" />
                                        </span>
                                      </li>
                                    </ListboxOption>
                                  </ListboxOptions>
                                </transition>
                              </div>
                            </Listbox>
                          </div>

                          <div class="sm:col-span-3">
                            <label
                              for="email"
                              class="block text-sm font-medium leading-6 text-gray-900"
                              >所需人数</label
                            >
                            <div class="mt-2 flex rounded-md shadow-sm">
                              <div class="relative flex flex-grow items-stretch focus-within:z-10">
                                <div
                                  class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
                                >
                                  <UsersIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                                </div>
                                <input
                                  id="email"
                                  class="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  placeholder="6"
                                  v-model="formData.job_needed_people"
                                />
                              </div>
                            </div>
                          </div>

                          <div class="col-span-3">
                            <label
                              for="price"
                              class="block text-sm font-medium leading-6 text-gray-900"
                              >薪水</label
                            >
                            <div class="relative mt-2 rounded-md shadow-sm">
                              <div
                                class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
                              >
                                <span class="text-gray-500 sm:text-sm">￥</span>
                              </div>
                              <input
                                type="text"
                                name="price"
                                id="price"
                                v-model="formData.job_salary"
                                class="block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="0.00"
                                aria-describedby="price-currency"
                              />
                              <div
                                class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
                              >
                                <span class="text-gray-500 sm:text-sm" id="price-currency"
                                  >RMB</span
                                >
                              </div>
                            </div>
                          </div>

                          <div class="sm:col-span-3">
                            <label
                              for="country"
                              class="block text-sm font-medium leading-6 text-gray-900"
                              >工作地点</label
                            >
                            <div class="mt-2">
                              <input
                                type="text"
                                name="street-address"
                                id="street-address"
                                v-model="formData.job_location"
                                autocomplete="street-address"
                                class="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div class="col-span-full">
                            <label
                              for="street-address"
                              class="block text-sm font-medium leading-6 text-gray-900"
                              >工作优势</label
                            >
                            <div class="mt-2">
                              <textarea
                                id="about"
                                name="about"
                                rows="3"
                                v-model="formData.job_advantage"
                                class="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                            <p
                              class="mt-1 text-xs text-orange-300 underline decoration-wavy italic"
                            >
                              职位优势之间，请使用空格分开
                            </p>
                          </div>
                          <div class="col-span-full">
                            <label
                              for="street-address"
                              class="block text-sm font-medium leading-6 text-gray-900"
                              >工作内容</label
                            >
                            <div class="mt-2">
                              <textarea
                                id="about"
                                name="about"
                                rows="3"
                                v-model="formData.job_content"
                                class="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                            <p
                              class="mt-1 text-xs text-orange-300 underline decoration-wavy italic"
                            >
                              工作内容之间，请使用空格分开
                            </p>
                          </div>
                          <div class="col-span-full">
                            <label
                              for="street-address"
                              class="block text-sm font-medium leading-6 text-gray-900"
                              >工作需求</label
                            >
                            <div class="mt-2">
                              <textarea
                                id="about"
                                name="about"
                                rows="3"
                                v-model="formData.job_request"
                                class="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                            <p
                              class="mt-1 text-xs text-orange-300 underline decoration-wavy italic"
                            >
                              工作需求之间，请使用空格分开
                            </p>
                          </div>
                        </div>
                      </div>

                      <div class="border-b border-gray-900/10 pb-12">
                        <h2 class="text-base font-semibold leading-7 text-gray-900">
                          下面是企业涉及的相关领域需求👇🏻
                        </h2>
                        <p class="mt-1 text-sm leading-6 text-gray-600">
                          请填写你的企业涉及的相关领域需求，比如技术、产品、设计等等
                        </p>

                        <div class="mt-10 space-y-10">
                          <fieldset>
                            <legend class="text-sm font-semibold leading-6 text-gray-900">
                              Field
                            </legend>
                            <div
                              class="mt-6 space-y-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 items-start justify-items-start"
                            >
                              <div
                                class="relative flex gap-x-3"
                                v-for="field in fields"
                                :key="field.id"
                              >
                                <div class="flex h-6 items-center">
                                  <input
                                    type="checkbox"
                                    class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    @click="
                                      () => {
                                        if (formData.job_interested_id.indexOf(field.id) === -1) {
                                          formData.job_interested_id.push(field.id)
                                        } else {
                                          formData.job_interested_id.splice(
                                            formData.job_interested_id.indexOf(field.id),
                                            1
                                          )
                                        }
                                      }
                                    "
                                  />
                                </div>
                                <div class="text-sm leading-6">
                                  <label for="comments" class="font-medium text-gray-900">{{
                                    field.name
                                  }}</label>
                                  <p class="text-gray-500">{{ field.description }}</p>
                                </div>
                              </div>
                            </div>
                          </fieldset>
                        </div>
                      </div>
                    </div>

                    <div class="mt-6 flex items-center justify-end gap-x-6">
                      <button
                        @click="isOpen = false"
                        type="button"
                        class="text-sm font-semibold leading-6 text-gray-900"
                      >
                        取消
                      </button>
                      <button
                        type="submit"
                        @click="submit"
                        class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        提交
                      </button>
                    </div>
                  </form>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </TransitionRoot>

      <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">企业招聘</h1>
        <p class="mt-4 max-w-xl text-sm text-gray-700">
          勾八招聘为求职者提供最新的北京企业招聘信息，北京招聘信息，海量公司在线招聘，直接开聊，在线约面试，找工作就上拉勾北京人才招聘网。
        </p>
      </div>

      <!-- Filters -->
      <section aria-labelledby="filter-heading">
        <h2 id="filter-heading" class="sr-only">Filters</h2>

        <div class="border-b border-gray-200 bg-white pb-4">
          <div class="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <Menu as="div" class="relative inline-block text-left">
              <div>
                <MenuButton
                  class="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  Sort
                  <ChevronDownIcon
                    class="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                </MenuButton>
              </div>

              <transition
                enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <MenuItems
                  class="absolute left-0 z-10 mt-2 w-40 origin-top-left rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <div class="py-1">
                    <MenuItem v-for="option in sortOptions" :key="option.name" v-slot="{ active }">
                      <a
                        :href="option.href"
                        :class="[
                          option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                          active ? 'bg-gray-100' : '',
                          'block px-4 py-2 text-sm'
                        ]"
                        @click="
                          () => {
                            for (let i = 0; i < sortOptions.length; i++) {
                              sortOptions[i].current = false
                            }
                            option.current = true
                            activeSort = option.name
                            renew()
                          }
                        "
                        >{{ option.name }}</a
                      >
                    </MenuItem>
                  </div>
                </MenuItems>
              </transition>
            </Menu>

            <button
              type="button"
              class="inline-block text-sm font-medium text-gray-700 hover:text-gray-900 sm:hidden"
              @click="open = true"
            >
              Filters
            </button>

            <div class="hidden sm:block">
              <div class="flow-root">
                <PopoverGroup class="-mx-4 flex items-center divide-x divide-gray-200">
                  <Popover
                    v-for="(section, sectionIdx) in filters"
                    :key="section.name"
                    class="relative inline-block px-4 text-left"
                  >
                    <PopoverButton
                      class="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
                    >
                      <span>{{ section.name }}</span>
                      <span
                        v-if="activeLists[sectionIdx].length != 0"
                        class="ml-1.5 rounded bg-gray-200 px-1.5 py-0.5 text-xs font-semibold tabular-nums text-gray-700"
                        >{{ activeLists[sectionIdx].length }}</span
                      >
                      <ChevronDownIcon
                        class="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                    </PopoverButton>

                    <transition
                      enter-active-class="transition ease-out duration-100"
                      enter-from-class="transform opacity-0 scale-95"
                      enter-to-class="transform opacity-100 scale-100"
                      leave-active-class="transition ease-in duration-75"
                      leave-from-class="transform opacity-100 scale-100"
                      leave-to-class="transform opacity-0 scale-95"
                    >
                      <PopoverPanel
                        class="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white p-4 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none"
                      >
                        <form class="space-y-4">
                          <div
                            v-for="(option, optionIdx) in section.options"
                            :key="option.value"
                            class="flex items-center"
                          >
                            <input
                              :id="`filter-${section.id}-${optionIdx}`"
                              :name="`${section.id}[]`"
                              :value="option.value"
                              type="checkbox"
                              :checked="option.checked"
                              @click="
                                () => {
                                  option.checked = !option.checked
                                  if (
                                    activeFilters.findIndex(
                                      (filter) => filter.value === option.value
                                    ) === -1
                                  ) {
                                    activeFilters.push(option)
                                  } else {
                                    activeFilters.splice(
                                      activeFilters.findIndex(
                                        (filter) => filter.value === option.value
                                      ),
                                      1
                                    )
                                  }
                                  renew()
                                }
                              "
                              class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              :for="`filter-${section.id}-${optionIdx}`"
                              class="ml-3 whitespace-nowrap pr-6 text-sm font-medium text-gray-900"
                              >{{ option.label }}</label
                            >
                          </div>
                        </form>
                      </PopoverPanel>
                    </transition>
                  </Popover>
                </PopoverGroup>
              </div>
            </div>
          </div>
        </div>

        <!-- Active filters -->
        <div class="bg-gray-100">
          <div class="mx-auto max-w-7xl px-4 py-3 sm:flex sm:items-center sm:px-6 lg:px-8">
            <h3 class="text-sm font-medium text-gray-500">
              Filters
              <span class="sr-only">, active</span>
            </h3>

            <div aria-hidden="true" class="hidden h-5 w-px bg-gray-300 sm:ml-4 sm:block" />

            <div class="mt-2 sm:ml-4 sm:mt-0">
              <div class="-m-1 flex flex-wrap items-center">
                <span
                  v-for="activeFilter in activeFilters"
                  :key="activeFilter.value"
                  class="m-1 inline-flex items-center rounded-full border border-gray-200 bg-white py-1.5 pl-3 pr-2 text-sm font-medium text-gray-900"
                >
                  <span>{{ activeFilter.label }}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <div>
      <div class="border-b border-gray-200 bg-white px-4 py-5 sm:px-6 max-w-[95%] mx-auto">
        <div class="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
          <div class="ml-4 mt-2">
            <h3 class="text-base font-semibold leading-6 text-gray-900">目前正在招聘的岗位👇🏻</h3>
          </div>
          <div class="ml-4 mt-2 flex-shrink-0">
            <button
              type="button"
              class="relative inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              @click="isOpen = true"
            >
              创建新的职位
            </button>
          </div>
        </div>
      </div>
      <ul role="list" class="divide-y divide-gray-200 max-w-[90%] mx-auto">
        <li
          v-for="recruit in page_data"
          :key="recruit.recruit_id"
          class="shadow-2xl rounded-lg m-1"
          @click="() => router.push(`/jobinfo/${recruit.recruit_id}`)"
        >
          <a href="#" class="block hover:bg-gray-50 hover:scale-105 transition-all ease-linear">
            <div class="px-4 py-4 sm:px-6">
              <div class="flex items-center justify-between">
                <div class="truncate text-xl font-medium text-indigo-500">
                  {{ recruit.job_name }}
                </div>
                <div class="ml-2 flex flex-shrink-0">
                  <span
                    class="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
                    >Full-time</span
                  >
                </div>
              </div>
              <dl
                class="mx-auto grid grid-cols-1 gap-px bg-gray-900/5 sm:grid-cols-2 lg:grid-cols-4"
              >
                <div
                  class="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-1 bg-white px-2 py-2 sm:px-4 xl:px-6"
                >
                  <dt class="text-sm font-medium leading-6 text-gray-500">工作天数</dt>
                  <dd class="text-xs font-medium">day / week</dd>
                  <dd
                    class="w-full flex-none text-xl font-medium leading-10 tracking-tight text-gray-900"
                  >
                    {{ recruit.job_day }}
                  </dd>
                </div>
                <div
                  class="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-1 bg-white px-2 py-2 sm:px-4 xl:px-6"
                >
                  <dt class="text-sm font-medium leading-6 text-gray-500">工作月数</dt>
                  <dd class="text-xs font-medium">month / year</dd>
                  <dd
                    class="w-full flex-none text-xl font-medium leading-10 tracking-tight text-gray-900"
                  >
                    {{ recruit.job_month }}
                  </dd>
                </div>
                <div
                  class="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-1 bg-white px-2 py-2 sm:px-4 xl:px-6"
                >
                  <dt class="text-sm font-medium leading-6 text-gray-500">薪资</dt>
                  <dd class="text-xs font-medium">K / month</dd>
                  <dd
                    class="w-full flex-none text-xl font-medium leading-10 tracking-tight text-gray-900"
                  >
                    {{ recruit.job_salary }}
                  </dd>
                </div>
                <div
                  class="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-1 bg-white px-2 py-2 sm:px-4 xl:px-6"
                >
                  <dt class="text-sm font-medium leading-6 text-gray-500">工作优势</dt>
                  <dd class="text-xs font-medium">
                    {{ Object.keys(recruit.job_advantage).length }}
                  </dd>

                  <ul class="w-full px-4 list-decimal">
                    <li
                      v-for="(advantage, index) in recruit.job_advantage"
                      :key="index"
                      class="flex-none text-sm font-medium leading-7 tracking-tight text-gray-900"
                    >
                      {{ advantage }}
                    </li>
                  </ul>
                </div>
              </dl>
              <div class="mt-2 flex justify-between">
                <div class="sm:flex">
                  <div class="flex items-center text-sm text-gray-500">
                    <UsersIcon class="h-5 w-5 mr-1" />
                    {{ recruit.job_needed_people }}
                  </div>
                </div>
                <div class="ml-2 flex items-center text-sm text-gray-500">
                  <MapPinIcon class="w-5 h-5 mr-1" />
                  {{ recruit.job_location }}
                </div>
              </div>
              <p class="mt-1 text-sm italic text-gray-500">
                {{ recruit.job_content['内容1'] }}........
              </p>
            </div>
          </a>
        </li>
      </ul>
    </div>
    <div
      class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
    >
      <div class="flex flex-1 justify-between sm:hidden">
        <a
          @click="
            () => {
              index = index - 10 < 0 ? 0 : index - 10
              renew()
            }
          "
          href="#"
          class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >Previous</a
        >
        <a
          @click="
            () => {
              index = index + 10 > data.length ? index : index + 10
              renew()
            }
          "
          href="#"
          class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >Next</a
        >
      </div>
      <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p class="text-sm text-gray-700">
            Showing
            {{ ' ' }}
            <span class="font-medium">{{ index + 1 }}</span>
            {{ ' ' }}
            to
            {{ ' ' }}
            <span class="font-medium">{{
              index + 10 > data.length ? data.length : index + 10
            }}</span>
            {{ ' ' }}
            of
            {{ ' ' }}
            <span class="font-medium">{{ data.length }}</span>
            {{ ' ' }}
            results
          </p>
        </div>
        <div>
          <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <a
              @click="
                () => {
                  index = index - 10 < 0 ? 0 : index - 10
                  renew()
                }
              "
              href="#"
              class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span class="sr-only">Previous</span>
              <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
            </a>
            <!-- Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" -->
            <a
              v-for="i in Math.ceil(data.length / 10)"
              :key="i"
              @click="
                () => {
                  index = (i - 1) * 10
                  renew()
                }
              "
              href="#"
              aria-current="page"
              :class="[
                Math.ceil(index / 10) + 1 == i ? 'bg-indigo-400' : '',
                'relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold text-black focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 active:bg-indigo-600'
              ]"
              >{{ i }}</a
            >
            <a
              @click="
                () => {
                  index = index + 10 > data.length ? index : index + 10
                  renew()
                }
              "
              href="#"
              class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span class="sr-only">Next</span>
              <ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ChevronLeftIcon, ChevronRightIcon, ChevronDownIcon } from '@heroicons/vue/20/solid'
import { computed, onMounted, ref } from 'vue'

import { MapPinIcon, UsersIcon, XMarkIcon } from '@heroicons/vue/24/outline'

import { useRouter, useRoute } from 'vue-router'

import { Dialog, DialogPanel, DialogTitle, TransitionRoot, TransitionChild } from '@headlessui/vue'

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel
} from '@headlessui/vue'

import { PhotoIcon, UserCircleIcon } from '@heroicons/vue/24/solid'

import {
  getUserProfile,
  getEnterpriseInfo,
  getEnterpriseRecruit
} from '@/stores/useCorporationStore'

import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions
} from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'

import axios from '@/utils/request'

const router = useRouter()
const route = useRoute()
let index = ref(0)

let userProfile = ref(null)
let enterpriseInfo = ref(null)
let enterpriseRecruit = ref(null)

const days = [
  { id: 1, name: 1 },
  { id: 2, name: 2 },
  { id: 3, name: 3 },
  { id: 4, name: 4 },
  { id: 5, name: 5 },
  { id: 6, name: 6 },
  { id: 7, name: 7 }
]
const months = [
  { id: 1, name: 1 },
  { id: 2, name: 2 },
  { id: 3, name: 3 },
  { id: 4, name: 4 },
  { id: 5, name: 5 },
  { id: 6, name: 6 },
  { id: 7, name: 7 },
  { id: 8, name: 8 },
  { id: 9, name: 9 },
  { id: 10, name: 10 },
  { id: 11, name: 11 },
  { id: 12, name: 12 }
]

const fields = [
  {
    id: 1,
    name: '前端工程师',
    description: '开发用户界面'
  },
  {
    id: 2,
    name: '后端工程师',
    description: '构建服务器端逻辑'
  },
  {
    id: 3,
    name: '全栈工程师',
    description: '掌握前后端技术'
  },
  {
    id: 4,
    name: '数据科学家',
    description: '数据分析与建模'
  },
  {
    id: 5,
    name: '数据分析师',
    description: '处理与解释数据'
  },
  {
    id: 6,
    name: '机器学习工程师',
    description: '开发智能算法'
  },
  {
    id: 7,
    name: '人工智能工程师',
    description: '设计智能系统'
  },
  {
    id: 8,
    name: '算法工程师',
    description: '优化算法性能'
  },
  {
    id: 9,
    name: '大数据工程师',
    description: '处理海量数据'
  },
  {
    id: 10,
    name: '云计算工程师',
    description: '管理云服务'
  },
  {
    id: 11,
    name: 'DevOps工程师',
    description: '运维与开发整合'
  },
  {
    id: 12,
    name: '网络安全工程师',
    description: '保护网络安全'
  },
  {
    id: 13,
    name: '移动应用开发工程师',
    description: '开发移动应用'
  },
  {
    id: 14,
    name: '嵌入式系统工程师',
    description: '设计嵌入式系统'
  },
  {
    id: 15,
    name: '系统架构师',
    description: '设计系统架构'
  },
  {
    id: 16,
    name: '数据库管理员',
    description: '管理数据库系统'
  },
  {
    id: 17,
    name: '自动化测试工程师',
    description: '开发测试流程'
  },
  {
    id: 18,
    name: '游戏开发工程师',
    description: '设计和开发游戏'
  },
  {
    id: 19,
    name: 'AR/VR工程师',
    description: '创建虚拟现实体验'
  },
  {
    id: 20,
    name: '物联网工程师',
    description: '开发物联网系统'
  },
  {
    id: 21,
    name: '自然语言处理工程师',
    description: '处理人机语言'
  },
  {
    id: 22,
    name: '机器人工程师',
    description: '设计和开发机器人'
  },
  {
    id: 23,
    name: '区块链开发工程师',
    description: '开发区块链应用'
  },
  {
    id: 24,
    name: '生物信息学工程师',
    description: '分析生物数据'
  },
  {
    id: 25,
    name: '电商开发工程师',
    description: '开发电商平台'
  },
  {
    id: 26,
    name: '计算机视觉工程师',
    description: '图像识别与处理'
  },
  {
    id: 27,
    name: '深度学习工程师',
    description: '构建深度学习模型'
  },
  {
    id: 28,
    name: '技术支持工程师',
    description: '提供技术支持'
  },
  {
    id: 29,
    name: '产品经理',
    description: '管理产品开发'
  }
]

let formData = ref({
  job_name: '',
  job_salary: '',
  job_advantage: null,
  job_location: '',
  job_day: days[3],
  job_month: months[3],
  enterprise: 0,
  created_at: '',
  job_needed_people: 0,
  job_interested_id: [],
  job_request: null,
  job_content: null,
  enterprise_name: '',
  enterprise_field: '',
  enterprise_icon: ''
})

async function fetchData() {
  userProfile.value = await getUserProfile()
  enterpriseInfo.value = await getEnterpriseInfo(userProfile.value.enterprise)
  enterpriseRecruit.value = await getEnterpriseRecruit(userProfile.value.enterprise)
}

function createFilter(form) {
  for (let i = 0; i < form.length; i++) {
    if (form[i].tag) {
      for (let j = 0; j < form[i].tag.length; j++) {
        filters.value[0].options.push({
          value: form[i].tag[j],
          label: form[i].tag[j],
          checked: false
        })
      }
    }
    if (form[i].job_advantage) {
      for (let j = 0; j < form[i].job_advantage.length; j++) {
        filters.value[1].options.push({
          value: form[i].job_advantage[j],
          label: form[i].job_advantage[j],
          checked: false
        })
      }
    }
    if (form[i].enterprise_field) {
      filters.value[2].options.push({
        value: form[i].enterprise_field,
        label: form[i].enterprise_field,
        checked: false
      })
    }
    for (let i = 0; i < filters.value.length; i++) {
      filters.value[i].options = filters.value[i].options.reduce((acc, current) => {
        let labels = acc.map((item) => item.label)
        if (!labels.includes(current.label) && current.label) {
          acc.push(current)
        }
        return acc
      }, [])
    }
  }
}

onMounted(async () => {
  await fetchData()
  createFilter(enterpriseRecruit.value)
  renew()
})

const sortOptions = [
  { name: '薪资最高', href: '#', current: false },
  { name: '需求最多', href: '#', current: false },
  { name: '最轻松', href: '#', current: false }
]
const filters = ref([
  {
    id: 'category',
    name: '标签',
    options: []
  },
  {
    id: 'adv',
    name: '工作优势',
    options: []
  },
  {
    id: 'field',
    name: '领域',
    options: []
  }
])
const activeFilters = ref([])

const activeSort = ref(null)

const activeLists = computed(() => {
  return [
    filters.value[0].options.filter((option) => option.checked),
    filters.value[1].options.filter((option) => option.checked),
    filters.value[2].options.filter((option) => option.checked)
  ]
})

let data = ref([])
let page_data = ref([])

// 根据现有的sort和filter来筛选数据
function renew() {
  data.value = enterpriseRecruit.value.filter((item) => {
    let flag = true
    for (let i = 0; i < activeLists.value[0].length; i++) {
      if (item.tag.includes(activeLists.value[0][i].label)) {
        break
      }
      if (i === activeLists.value[0].length - 1) {
        return false
      }
    }
    for (let i = 0; i < activeLists.value[1].length; i++) {
      if (item.job_advantage.includes(activeLists.value[1][i].label)) {
        break
      }
      if (i === activeLists.value[1].length - 1) {
        return false
      }
    }
    for (let i = 0; i < activeLists.value[2].length; i++) {
      if (item.enterprise_field == activeLists.value[2][i].label) {
        break
      }
      if (i === activeLists.value[2].length - 1) {
        return false
      }
    }
    return flag
  })
  //   依据sort来排序
  if (activeSort.value == '薪资最高') {
    data.value.sort((a, b) => {
      return getFirstNumberFromString(b.job_salary) - getFirstNumberFromString(a.job_salary)
    })
  } else if (activeSort.value == '需求最多') {
    data.value.sort((a, b) => {
      return b.job_needed_people - a.job_needed_people
    })
  } else if (activeSort.value == '最轻松') {
    data.value.sort((a, b) => {
      return a.job_day - b.job_day
    })
  }
  page_data.value = data.value.slice(index.value, index.value + 10)
}

function getFirstNumberFromString(str) {
  const match = str.match(/^\d+/)
  return match ? match[0] : null
}

const submit = async () => {
  isOpen.value = false

  formData.value.job_month = formData.value.job_month.id
  formData.value.job_day = formData.value.job_day.id

  if (typeof formData.value.job_needed_people === 'string') {
    formData.value.job_needed_people = parseInt(formData.value.job_needed_people)
  }

  let temp = {}
  if (formData.value.job_advantage) {
    formData.value.job_advantage = formData.value.job_advantage?.split(' ')
    for (let i = 1; i <= formData.value.job_advantage.length; i++) {
      temp['优势' + i] = formData.value.job_advantage[i - 1]
    }
    formData.value.job_advantage = temp
  }

  if (formData.value.job_content) {
    formData.value.job_content = formData.value.job_content.split(' ')
    temp = {}
    for (let i = 1; i <= formData.value.job_content.length; i++) {
      temp['内容' + i] = formData.value.job_content[i - 1]
    }
    formData.value.job_content = temp
  }

  if (formData.value.job_request) {
    formData.value.job_request = formData.value.job_request.split(' ')
    temp = {}
    for (let i = 1; i <= formData.value.job_request.length; i++) {
      temp['需求' + i] = formData.value.job_request[i - 1]
    }
    formData.value.job_request = temp
  }

  formData.value.created_at = new Date().toISOString()
  formData.value.enterprise = enterpriseInfo.value.enterprise_id
  formData.value.enterprise_name = enterpriseInfo.value.name
  formData.value.enterprise_field = enterpriseInfo.value.field
  formData.value.enterprise_icon = enterpriseInfo.value.icon

  console.log(formData.value)

  await axios.post('/api/recruit/recruit_create', formData.value)
}

const isOpen = ref(false)
const open = ref(false)
</script>
