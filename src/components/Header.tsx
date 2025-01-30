import { A } from "@solidjs/router";
import { Component } from "solid-js";
import { tw } from "twind";

export const Header = (props: {title: string, url: string}) => {
  return (
    <header class={tw`mb-12 pt-6 text-center`}>
      <A href={props.url}>
      <h1 class={tw`text-2xl font-bold dark:text-white`}>{props.title}</h1>
      </A>
    </header>
  );
};
