<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import BaseInput from "@/components/BaseInput.vue";
import BaseButton from "@/components/BaseButton.vue";
import Brand from "@/components/Brand.vue";

const { t } = useI18n();
const router = useRouter();

const error = ref("");
const sender = ref("");
const wishes = reactive([""]);

const lastWish = computed(() => wishes[wishes.length - 1]);

const wishPlaceholder = (index: number) => {
  if (index === 0) {
    return t("wishPlaceHolderInitial");
  }

  return t("wishPlaceholder");
};

const onInput = (index: number) => {
  if (wishes[index] === "" && wishes.length > 1) {
    wishes.splice(index, 1);
  }

  if (lastWish.value !== "") {
    wishes.push("");
  }
};

const onSubmit = async () => {
  const formData = {
    sender: sender.value,
    wishes: wishes.filter((wish) => wish).join("; "),
  };

  try {
    const response = await fetch(import.meta.env.VITE_FORM_ACTION_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    // // For testing
    // const data = { success: "true" };
    if (data.success === "true") {
      router.push("/success");
    } else {
      console.error(data);
    }
  } catch (err) {
    console.error(err);
    error.value = t("error");
  }
};
</script>

<template>
  <form class="letter" @submit.prevent="onSubmit">
    <main class="frame-paper">
      <h1>{{ $t("title") }}</h1>
      <BaseInput
        v-for="(wish, index) in wishes"
        :key="index"
        v-model="wishes[index]"
        :prefix="$t('wantPrefix')"
        :placeholder="wishPlaceholder(index)"
        @input="onInput(index)"
      />

      <p class="name-prefix">
        {{ $t("ending") }}
      </p>
      <BaseInput
        v-model="sender"
        class="name"
        :placeholder="$t('namePlaceholder')"
        requered
      />
    </main>
    <p v-if="error" class="error">{{ error }}</p>
    <footer>
      <Brand class="brand" />
      <BaseButton type="submit">
        {{ $t("send") }}
      </BaseButton>
    </footer>
  </form>
</template>

<style scoped>
.letter {
  display: grid;
  gap: 1.75rem;
  justify-items: end;
  max-width: 30rem;
  width: 100%;
}

.letter main {
  --row-height: 2rem;
  --line-width: 1px;
  --font-size: calc(var(--row-height) * 0.8);

  display: grid;
  width: 100%;

  background-image: repeating-linear-gradient(
    transparent,
    transparent calc(var(--row-height) - var(--line-width)),
    #dfdded calc(var(--row-height) - var(--line-width)),
    #dfdded var(--row-height)
  );

  padding-block: var(--row-height);
}

.letter main > * {
  padding-inline: 1.25rem;
  font-size: var(--font-size);
  font-family: inherit;
  height: var(--row-height);
  display: flex;
  align-items: center;
}

h1 {
  justify-self: center;
  margin-block-end: calc(var(--row-height) * 2);
}

.name-prefix {
  margin-block-start: calc(var(--row-height) * 6);
}

:deep(.name) {
  padding-inline-start: 2rem;
}

footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  margin-block-start: 1.75rem;
}

.error {
  color: #A30000;
}

.brand :deep(img) {
  max-width: 100%;
  height: auto;
}

@media (min-width: 75rem) {
  .brand {
    position: absolute;
    inset-inline-start: 2rem;
    inset-block-end: 1rem;
  }
}
</style>
