/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkSidebar2Details_Test_QueryVariables = {};
export type ArtworkSidebar2Details_Test_QueryResponse = {
    readonly artwork: {
        readonly " $fragmentRefs": FragmentRefs<"ArtworkSidebar2Details_artwork">;
    } | null;
};
export type ArtworkSidebar2Details_Test_Query = {
    readonly response: ArtworkSidebar2Details_Test_QueryResponse;
    readonly variables: ArtworkSidebar2Details_Test_QueryVariables;
};



/*
query ArtworkSidebar2Details_Test_Query {
  artwork(id: "josef-albers-homage-to-the-square-85") {
    ...ArtworkSidebar2Details_artwork
    id
  }
}

fragment ArtworkSidebar2AuthenticityCertificate_artwork on Artwork {
  hasCertificateOfAuthenticity
  isBiddable
}

fragment ArtworkSidebar2Classification_artwork on Artwork {
  attributionClass {
    shortArrayDescription
    id
  }
}

fragment ArtworkSidebar2Details_artwork on Artwork {
  medium
  dimensions {
    in
    cm
  }
  framed {
    details
  }
  editionOf
  ...ArtworkSidebar2Classification_artwork
  ...ArtworkSidebar2AuthenticityCertificate_artwork
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "josef-albers-homage-to-the-square-85"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v3 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v4 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtworkSidebar2Details_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ArtworkSidebar2Details_artwork"
          }
        ],
        "storageKey": "artwork(id:\"josef-albers-homage-to-the-square-85\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ArtworkSidebar2Details_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "medium",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "dimensions",
            "kind": "LinkedField",
            "name": "dimensions",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "in",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "cm",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtworkInfoRow",
            "kind": "LinkedField",
            "name": "framed",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "details",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "editionOf",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "AttributionClass",
            "kind": "LinkedField",
            "name": "attributionClass",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "shortArrayDescription",
                "storageKey": null
              },
              (v1/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "hasCertificateOfAuthenticity",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isBiddable",
            "storageKey": null
          },
          (v1/*: any*/)
        ],
        "storageKey": "artwork(id:\"josef-albers-homage-to-the-square-85\")"
      }
    ]
  },
  "params": {
    "cacheID": "22af4c56840cf26889df0ba75384d50d",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "artwork.attributionClass": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AttributionClass"
        },
        "artwork.attributionClass.id": (v2/*: any*/),
        "artwork.attributionClass.shortArrayDescription": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "String"
        },
        "artwork.dimensions": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "dimensions"
        },
        "artwork.dimensions.cm": (v3/*: any*/),
        "artwork.dimensions.in": (v3/*: any*/),
        "artwork.editionOf": (v3/*: any*/),
        "artwork.framed": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkInfoRow"
        },
        "artwork.framed.details": (v3/*: any*/),
        "artwork.hasCertificateOfAuthenticity": (v4/*: any*/),
        "artwork.id": (v2/*: any*/),
        "artwork.isBiddable": (v4/*: any*/),
        "artwork.medium": (v3/*: any*/)
      }
    },
    "name": "ArtworkSidebar2Details_Test_Query",
    "operationKind": "query",
    "text": "query ArtworkSidebar2Details_Test_Query {\n  artwork(id: \"josef-albers-homage-to-the-square-85\") {\n    ...ArtworkSidebar2Details_artwork\n    id\n  }\n}\n\nfragment ArtworkSidebar2AuthenticityCertificate_artwork on Artwork {\n  hasCertificateOfAuthenticity\n  isBiddable\n}\n\nfragment ArtworkSidebar2Classification_artwork on Artwork {\n  attributionClass {\n    shortArrayDescription\n    id\n  }\n}\n\nfragment ArtworkSidebar2Details_artwork on Artwork {\n  medium\n  dimensions {\n    in\n    cm\n  }\n  framed {\n    details\n  }\n  editionOf\n  ...ArtworkSidebar2Classification_artwork\n  ...ArtworkSidebar2AuthenticityCertificate_artwork\n}\n"
  }
};
})();
(node as any).hash = 'cf08851f71a34aa86736db92912744b2';
export default node;