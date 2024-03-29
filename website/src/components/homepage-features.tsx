/*
 * Copyright 2024 Recoco
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import Translate from "@docusaurus/Translate";
import logoDark from "@site/static/img/logo-dark.svg";
import logoLight from "@site/static/img/logo-light.svg";
import Heading from "@theme/Heading";
import { ComponentProps, ComponentType, ReactNode } from "react";

interface FeatureItem {
  title: string;
  Svg: ComponentType<ComponentProps<"svg">>;
  description: ReactNode;
}

const features: FeatureItem[] = [
  {
    title: "Feature 1",
    Svg: logoLight,
    description: (
      <Translate id="home.features.1.description"/>
    ),
  },
  {
    title: "Feature 2",
    Svg: logoDark,
    description: (
      <Translate id="home.features.2.description"/>
    ),
  },
  {
    title: "Feature 3",
    Svg: logoLight,
    description: (
      <Translate id="home.features.3.description"/>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className="col">
      <div className="text-center">
        <Svg className="size-[200px]" role="img"/>
      </div>
      <div className="px-4 text-center">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className="flex w-full items-center py-8">
      <div className="container">
        <div className="row">
          {features.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
