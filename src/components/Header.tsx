import { A } from "@solidjs/router";

export const Header = (props: {title: string, url: string}) => {
  return (
    <header class="mb-12 pt-6 text-center">
      <A href={props.url}>
      <h1 class="text-2xl font-bold dark:text-white">{props.title}</h1>
      </A>
    </header>
  );
};
