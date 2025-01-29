import { Component } from "solid-js";
import { tw } from "twind";

export const Header = (props: {title: string}) => {
  return (
    <header class={tw`mb-12 text-center`}>
      <h1 class={tw`text-2xl font-bold`}>{props.title}</h1>
    </header>
  );
};
