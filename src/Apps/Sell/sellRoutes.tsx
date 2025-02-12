import loadable from "@loadable/component"
import type { RouteProps } from "System/Router/Route"
import { getENV } from "Utils/getENV"
import type { RouteRenderArgs } from "found"
import { graphql } from "react-relay"

const IntroRoute = loadable(
  () => import(/* webpackChunkName: "sellBundle" */ "./Routes/IntroRoute"),
  {
    resolveComponent: component => component.IntroRoute,
  },
)

const SubmissionRoute = loadable(
  () => import(/* webpackChunkName: "sellBundle" */ "./Routes/SubmissionRoute"),
  {
    resolveComponent: component => component.SubmissionRoute,
  },
)

const NewRoute = loadable(
  () => import(/* webpackChunkName: "sellBundle" */ "./Routes/NewRoute"),
  {
    resolveComponent: component => component.NewRoute,
  },
)

const ArtistRoute = loadable(
  () => import(/* webpackChunkName: "sellBundle" */ "./Routes/ArtistRoute"),
  {
    resolveComponent: component => component.ArtistRouteFragmentContainer,
  },
)

const TitleRoute = loadable(
  () => import(/* webpackChunkName: "sellBundle" */ "./Routes/TitleRoute"),
  {
    resolveComponent: component => component.TitleRoute,
  },
)

const PhotosRoute = loadable(
  () => import(/* webpackChunkName: "sellBundle" */ "./Routes/PhotosRoute"),
  {
    resolveComponent: component => component.PhotosRoute,
  },
)

const DetailsRoute = loadable(
  () => import(/* webpackChunkName: "sellBundle" */ "./Routes/DetailsRoute"),
  {
    resolveComponent: component => component.DetailsRoute,
  },
)

const DimensionsRoute = loadable(
  () => import(/* webpackChunkName: "sellBundle" */ "./Routes/DimensionsRoute"),
  {
    resolveComponent: component => component.DimensionsRoute,
  },
)

const PhoneNumberRoute = loadable(
  () =>
    import(/* webpackChunkName: "sellBundle" */ "./Routes/PhoneNumberRoute"),
  {
    resolveComponent: component => component.PhoneNumberRoute,
  },
)

const PurchaseHistoryRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "sellBundle" */ "./Routes/PurchaseHistoryRoute"
    ),
  {
    resolveComponent: component => component.PurchaseHistoryRoute,
  },
)

const NewFromMyCollectionRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "sellBundle" */ "./Routes/NewFromMyCollectionRoute"
    ),
  {
    resolveComponent: component => component.NewFromMyCollectionRoute,
  },
)

const ThankYouRoute = loadable(
  () => import(/* webpackChunkName: "sellBundle" */ "./Routes/ThankYouRoute"),
  {
    resolveComponent: component => component.ThankYouRoute,
  },
)

const ArtistNotEligibleRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "sellBundle" */ "./Routes/ArtistNotEligibleRoute"
    ),
  {
    resolveComponent: component => component.ArtistNotEligibleRoute,
  },
)

const AdditionalDocumentsRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "sellBundle" */ "./Routes/AdditionalRoutes/AdditionalDocumentsRoute"
    ),
  {
    resolveComponent: component => component.AdditionalDocumentsRoute,
  },
)

const ConditionRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "sellBundle" */ "./Routes/AdditionalRoutes/ConditionRoute"
    ),
  {
    resolveComponent: component => component.ConditionRoute,
  },
)

const ShippingLocationRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "sellBundle" */ "./Routes/AdditionalRoutes/ShippingLocationRoute"
    ),
  {
    resolveComponent: component => component.ShippingLocationRoute,
  },
)

const FrameRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "sellBundle" */ "./Routes/AdditionalRoutes/FrameRoute"
    ),
  {
    resolveComponent: component => component.FrameRoute,
  },
)

const MarketingLandingApp = loadable(
  () =>
    import(
      /* webpackChunkName: "consignBundle" */ "./Routes/MarketingLanding/MarketingLandingApp"
    ),
  {
    resolveComponent: component => component.MarketingLandingApp,
  },
)

const FAQApp = loadable(
  () => import(/* webpackChunkName: "consignBundle" */ "./Routes/FAQ/FAQApp"),
  {
    resolveComponent: component => component.FAQApp,
  },
)

const ConsignmentInquiryApp = loadable(
  () =>
    import(
      /* webpackChunkName: "consignBundle" */ "./Routes/ConsignmentInquiry/ConsignmentInquiry"
    ),
  {
    resolveComponent: component =>
      component.ConsignmentInquiryFragmentContainer,
  },
)
const ConsignmentInquiryConfirmationApp = loadable(
  () =>
    import(
      /* webpackChunkName: "consignBundle" */ "./Routes/ConsignmentInquiry/ConsignmentInquiryConfirmation"
    ),
  {
    resolveComponent: component => component.ConsignmentInquiryConfirmation,
  },
)

const ConsignmentInquiryContainer = loadable(
  () =>
    import(
      /* webpackChunkName: "consignBundle" */ "./Routes/ConsignmentInquiry/ConsignmentInquiryContainer"
    ),
  {
    resolveComponent: component => component.ConsignmentInquiryContainer,
  },
)

export const sellRoutes: RouteProps[] = [
  {
    path: "/sell",
    onPreloadJS: () => {
      MarketingLandingApp.preload()
    },
    children: [
      {
        path: "",
        layout: "FullBleed",
        getComponent: () => MarketingLandingApp,
        onPreloadJS: () => {
          MarketingLandingApp.preload()
        },
      },
      {
        path: "faq",
        layout: "NavOnly",
        getComponent: () => FAQApp,
        onPreloadJS: () => {
          FAQApp.preload()
        },
      },

      // Sell Flow: Pre-Approval Steps

      {
        path: "intro",
        layout: "ContainerOnly",
        Component: IntroRoute,
        onPreloadJS: () => {
          IntroRoute.preload()
        },
      },
      {
        path: "submissions/new",
        layout: "ContainerOnly",
        Component: NewRoute,
        onPreloadJS: () => {
          NewRoute.preload()
        },
      },
      {
        path: "artist-not-eligible/:artistID",
        layout: "ContainerOnly",
        Component: ArtistNotEligibleRoute,
        onPreloadJS: () => {
          ArtistNotEligibleRoute.preload()
        },
        query: graphql`
          query sellRoutes_ArtistNotEligibleRouteQuery($id: String!) {
            artist(id: $id) @principalField {
              ...ArtistNotEligibleRoute_artist
            }
          }
        `,
        prepareVariables: ({ artistID }) => {
          return { id: artistID }
        },
      },
      {
        path: "submissions/new/collection",
        layout: "ContainerOnly",
        Component: NewFromMyCollectionRoute,
        onPreloadJS: () => {
          NewFromMyCollectionRoute.preload()
        },
        onServerSideRender: checkIfLoggedIn,
      },

      {
        path: "submissions/:id",
        Component: SubmissionRoute,
        onPreloadJS: () => {
          SubmissionRoute.preload()
        },
        query: graphql`
          query sellRoutes_SubmissionRouteQuery($id: ID!, $sessionID: String!) {
            submission(id: $id, sessionID: $sessionID) @principalField {
              ...SubmissionRoute_submission
            }
          }
        `,
        prepareVariables: ({ id }) => {
          return { id, sessionID: getENV("SESSION_ID") }
        },
        children: [
          {
            path: "artist",
            layout: "ContainerOnly",
            Component: ArtistRoute,
            onPreloadJS: () => {
              ArtistRoute.preload()
            },
            query: graphql`
              query sellRoutes_ArtistRouteQuery($id: ID!, $sessionID: String!) {
                submission(id: $id, sessionID: $sessionID) @principalField {
                  ...ArtistRoute_submission
                }
              }
            `,
            prepareVariables: ({ id }) => {
              return { id, sessionID: getENV("SESSION_ID") }
            },
          },
          {
            path: "title",
            layout: "ContainerOnly",
            Component: TitleRoute,
            onPreloadJS: () => {
              TitleRoute.preload()
            },
            query: graphql`
              query sellRoutes_TitleRouteQuery($id: ID!, $sessionID: String!) {
                submission(id: $id, sessionID: $sessionID) @principalField {
                  ...TitleRoute_submission
                }
              }
            `,
            prepareVariables: ({ id }) => {
              return { id, sessionID: getENV("SESSION_ID") }
            },
          },
          {
            path: "photos",
            layout: "ContainerOnly",
            Component: PhotosRoute,
            onPreloadJS: () => {
              PhotosRoute.preload()
            },
            query: graphql`
              query sellRoutes_PhotosRouteQuery($id: ID!, $sessionID: String!) {
                submission(id: $id, sessionID: $sessionID) @principalField {
                  ...PhotosRoute_submission
                }
              }
            `,
            prepareVariables: ({ id }) => {
              return { id, sessionID: getENV("SESSION_ID") }
            },
          },
          {
            path: "details",
            layout: "ContainerOnly",
            Component: DetailsRoute,
            onPreloadJS: () => {
              DetailsRoute.preload()
            },
            query: graphql`
              query sellRoutes_DetailsRouteQuery(
                $id: ID!
                $sessionID: String!
              ) {
                submission(id: $id, sessionID: $sessionID) @principalField {
                  ...DetailsRoute_submission
                }
              }
            `,
            prepareVariables: ({ id }) => {
              return { id, sessionID: getENV("SESSION_ID") }
            },
          },
          {
            path: "purchase-history",
            layout: "ContainerOnly",
            Component: PurchaseHistoryRoute,
            onPreloadJS: () => {
              PurchaseHistoryRoute.preload()
            },
            query: graphql`
              query sellRoutes_PurchaseHistoryRouteQuery(
                $id: ID!
                $sessionID: String!
              ) {
                submission(id: $id, sessionID: $sessionID) @principalField {
                  ...PurchaseHistoryRoute_submission
                }
              }
            `,
            prepareVariables: ({ id }) => {
              return { id, sessionID: getENV("SESSION_ID") }
            },
          },
          {
            path: "dimensions",
            layout: "ContainerOnly",
            Component: DimensionsRoute,
            onPreloadJS: () => {
              DimensionsRoute.preload()
            },
            query: graphql`
              query sellRoutes_DimensionsRouteQuery(
                $id: ID!
                $sessionID: String!
              ) {
                submission(id: $id, sessionID: $sessionID) @principalField {
                  ...DimensionsRoute_submission
                }
              }
            `,
            prepareVariables: ({ id }) => {
              return { id, sessionID: getENV("SESSION_ID") }
            },
          },
          {
            path: "phone-number",
            layout: "ContainerOnly",
            Component: PhoneNumberRoute,
            onPreloadJS: () => {
              PhoneNumberRoute.preload()
            },
            query: graphql`
              query sellRoutes_PhoneNumberRouteQuery(
                $id: ID!
                $sessionID: String!
              ) {
                submission(id: $id, sessionID: $sessionID) @principalField {
                  ...PhoneNumberRoute_submission
                }
                me {
                  ...PhoneNumberRoute_me
                }
              }
            `,
            prepareVariables: ({ id }) => {
              return { id, sessionID: getENV("SESSION_ID") }
            },
          },
          {
            path: "thank-you",
            layout: "ContainerOnly",
            Component: ThankYouRoute,
            onPreloadJS: () => {
              ThankYouRoute.preload()
            },
            onServerSideRender: checkIfLoggedIn,
            query: graphql`
              query sellRoutes_ThankYouRouteQuery($id: ID!) {
                submission(id: $id) @principalField {
                  ...ThankYouRoute_submission
                }
              }
            `,
            prepareVariables: ({ id }) => {
              return { id }
            },
          },

          // Sell Flow: Post-Approval Steps

          {
            path: "shipping-location",
            layout: "ContainerOnly",
            Component: ShippingLocationRoute,
            onPreloadJS: () => {
              ShippingLocationRoute.preload()
            },
            onServerSideRender: checkIfLoggedIn,
            query: graphql`
              query sellRoutes_ShippingLocationRouteQuery($id: ID!) {
                submission(id: $id) @principalField {
                  ...ShippingLocationRoute_submission
                }
                me {
                  ...ShippingLocationRoute_me
                }
              }
            `,
            prepareVariables: ({ id }) => {
              return { id }
            },
          },
          {
            path: "frame",
            layout: "ContainerOnly",
            Component: FrameRoute,
            onPreloadJS: () => {
              FrameRoute.preload()
            },
            onServerSideRender: checkIfLoggedIn,
            query: graphql`
              query sellRoutes_FrameRouteQuery($id: ID!) {
                submission(id: $id) @principalField {
                  ...FrameRoute_submission
                }
              }
            `,
            prepareVariables: ({ id }) => {
              return { id }
            },
          },
          {
            path: "additional-documents",
            layout: "ContainerOnly",
            Component: AdditionalDocumentsRoute,
            onPreloadJS: () => {
              AdditionalDocumentsRoute.preload()
            },
            onServerSideRender: checkIfLoggedIn,
            query: graphql`
              query sellRoutes_AdditionalDocumentsRouteQuery($id: ID!) {
                submission(id: $id) @principalField {
                  ...AdditionalDocumentsRoute_submission
                }
              }
            `,
            prepareVariables: ({ id }) => {
              return { id }
            },
          },
          {
            path: "condition",
            layout: "ContainerOnly",
            Component: ConditionRoute,
            onPreloadJS: () => {
              ConditionRoute.preload()
            },
            onServerSideRender: checkIfLoggedIn,
            query: graphql`
              query sellRoutes_ConditionRouteQuery($id: ID!) {
                submission(id: $id) @principalField {
                  ...ConditionRoute_submission
                }
              }
            `,
            prepareVariables: ({ id }) => {
              return { id }
            },
          },
          {
            path: "thank-you-post-approval",
            layout: "ContainerOnly",
            Component: ThankYouRoute,
            onPreloadJS: () => {
              ThankYouRoute.preload()
            },
            onServerSideRender: checkIfLoggedIn,
            query: graphql`
              query sellRoutes_ThankYouPostApprovalRouteQuery($id: ID!) {
                submission(id: $id) @principalField {
                  ...ThankYouRoute_submission
                }
              }
            `,
            prepareVariables: ({ id }) => {
              return { id }
            },
          },
        ],
      },

      // Inquiry Routes

      {
        path: "inquiry",
        getComponent: () => ConsignmentInquiryContainer,
        children: [
          {
            path: "",
            getComponent: () => ConsignmentInquiryApp,
            layout: "ContainerOnly",
            onPreloadJS: () => {
              ConsignmentInquiryApp.preload()
            },
            query: graphql`
              query sellRoutes_ConsignmentInquiryAppQuery {
                me {
                  ...ConsignmentInquiry_me
                }
                viewer {
                  ...ConsignmentInquiry_viewer
                }
              }
            `,
            render: ({ Component, props }: RouteRenderArgs) => {
              if (!(Component && props)) {
                return undefined
              }
              return <Component {...props} />
            },
          },
          {
            path: "sent",
            layout: "ContainerOnly",
            getComponent: () => ConsignmentInquiryConfirmationApp,
            onPreloadJS: () => {
              ConsignmentInquiryConfirmationApp.preload()
            },
          },
          {
            path: ":recipientEmail?",
            children: [
              {
                path: "",
                getComponent: () => ConsignmentInquiryApp,
                layout: "ContainerOnly",
                onPreloadJS: () => {
                  ConsignmentInquiryApp.preload()
                },
                query: graphql`
                  query sellRoutes_ConsignmentInquiryWithRecipientEmailAppQuery {
                    me {
                      ...ConsignmentInquiry_me
                    }
                    viewer {
                      ...ConsignmentInquiry_viewer
                    }
                  }
                `,
                render: ({ Component, props }: RouteRenderArgs) => {
                  if (!(Component && props)) {
                    return undefined
                  }
                  return <Component {...props} />
                },
              },
              {
                path: "sent",
                layout: "ContainerOnly",
                getComponent: () => ConsignmentInquiryConfirmationApp,
                onPreloadJS: () => {
                  ConsignmentInquiryConfirmationApp.preload()
                },
              },
            ],
          },
        ],
      },
    ],
  },
]

function checkIfLoggedIn({ req, res }) {
  if (!req.user) {
    res.redirect(`/login?redirectTo=${req.originalUrl}`)
  }
}
