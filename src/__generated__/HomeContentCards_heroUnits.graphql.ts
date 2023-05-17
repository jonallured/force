/**
 * @generated SignedSource<<3611ed1c34ee53442c2a5da883fc8bb0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type HomeContentCards_heroUnits$data = {
  readonly edges: ReadonlyArray<{
    readonly node: {
      readonly body: string;
      readonly credit: string | null;
      readonly image: {
        readonly imageURL: string | null;
      } | null;
      readonly label: string | null;
      readonly linkText: string;
      readonly linkUrl: string;
      readonly title: string;
    } | null;
  } | null> | null;
  readonly " $fragmentType": "HomeContentCards_heroUnits";
};
export type HomeContentCards_heroUnits$key = {
  readonly " $data"?: HomeContentCards_heroUnits$data;
  readonly " $fragmentSpreads": FragmentRefs<"HomeContentCards_heroUnits">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "HomeContentCards_heroUnits",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "HeroUnitEdge",
      "kind": "LinkedField",
      "name": "edges",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "HeroUnit",
          "kind": "LinkedField",
          "name": "node",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "body",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "credit",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "Image",
              "kind": "LinkedField",
              "name": "image",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "imageURL",
                  "storageKey": null
                }
              ],
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "label",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "linkText",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "linkUrl",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "title",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "HeroUnitConnection",
  "abstractKey": null
};

(node as any).hash = "67c111593061f1988d6d5138f50f64b2";

export default node;
