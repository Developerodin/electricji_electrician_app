import {
  Image,
  Platform,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SvgXml } from 'react-native-svg';
import type { FC } from 'react';
import { SPLASH_BOTTOM_ELLIPSE_XML, SPLASH_LOGO_XML } from './splashVectorXml';

/** Figma SPLASH (#4089:1169) artboard — use for proportional scaling */
const DESIGN_W = 412;
const DESIGN_H = 917;

/** Logo vector frame (Group 13) */
const LOGO_W_D = 92.0329;
const LOGO_H_D = 65.0444;

/** Bottom ellipse (Ellipse 21) — x=-84 in file; wider than screen, clipped */
const ELLIPSE_W_D = 577;
const ELLIPSE_H_D = 237;
/** Ellipse extends below artboard bottom by this much (775+237 - 917) */
const ELLIPSE_BOTTOM_OVERFLOW_D = 95;

/** Figma: hero at x=34, w=368 */
const HERO_W_D = 368;
const HERO_H_D = 363;

/** Figma: top content block starts at y=184 */
const CONTENT_TOP_PADDING_D = 184;

/** Figma: gap between logo glyph and “Electric Ji” (approx 24) */
const LOGO_TITLE_GAP_D = 24;

/** Figma: badge size / positions relative to hero */
const BADGE_SIZE_D = 25.719;
const BADGE_LEFT_D = 226.93212890625 - 34;
const BADGE_TOP_D = 513.753173828125 - 479;

/** Figma: main branding column offset from top of content ~69.5 centered → use max width */
const BRAND_MAX_W = 320;

/** Figma SPLASH (#4089:1169) — Delivery Partner App */
export const SplashScreen: FC = () => {
  const { width: SCREEN_W, height: SCREEN_H } = useWindowDimensions();
  const heroAspect = HERO_W_D / HERO_H_D;

  const scaleX = SCREEN_W / DESIGN_W;
  const scaleY = SCREEN_H / DESIGN_H;
  const SCALE = Math.min(scaleX, scaleY);

  const logoW = LOGO_W_D * SCALE;
  const logoH = LOGO_H_D * SCALE;
  const ellipseW = ELLIPSE_W_D * SCALE;
  const ellipseH = ELLIPSE_H_D * SCALE;
  const ellipseOverflowBottom = ELLIPSE_BOTTOM_OVERFLOW_D * SCALE;

  const heroW = Math.min(HERO_W_D * SCALE, SCREEN_W - 32);
  const badgeSize = BADGE_SIZE_D * SCALE;

  const paddingTop = Math.max(
    Platform.OS === 'ios' ? 12 : 8,
    CONTENT_TOP_PADDING_D * SCALE - (Platform.OS === 'android' ? 8 : 0),
  );

  return (
    <View style={styles.root}>
      {/* Ellipse behind mascot (Figma paints hero above Ellipse 21) */}
      <View style={styles.ellipseLayer} pointerEvents="none">
        <View
          style={[
            styles.ellipseWrap,
            {
              marginBottom: -ellipseOverflowBottom,
            },
          ]}
        >
          <SvgXml
            xml={SPLASH_BOTTOM_ELLIPSE_XML}
            width={ellipseW}
            height={ellipseH}
            preserveAspectRatio="xMidYMid meet"
          />
        </View>
      </View>

      <View style={[styles.mainColumn, { width: SCREEN_W, paddingTop }]}>
        <View style={[styles.brandBlock, { maxWidth: BRAND_MAX_W }]}>
          <View style={[styles.logoTitleBlock, { gap: LOGO_TITLE_GAP_D * SCALE }]}>
            <View
              accessibilityLabel="Electric Ji logo"
              accessible
              style={[styles.logoIconWrap, { width: logoW, height: logoH }]}
            >
              <SvgXml
                xml={SPLASH_LOGO_XML}
                width={logoW}
                height={logoH}
                preserveAspectRatio="xMidYMid meet"
              />
            </View>
            <Text style={[styles.title, { fontSize: 34.154 * SCALE }]}>
              Electric Ji
            </Text>
          </View>
          <Text
            style={[
              styles.subtitle,
              {
                fontSize: Math.max(7, 8 * SCALE),
                letterSpacing: 3.2,
                marginTop: 8 * SCALE,
              },
            ]}
          >
            Making your life EAJI
          </Text>
          <Text style={[styles.marketplace, { marginTop: 32 * SCALE }]}>
            <Text
              style={[
                styles.marketplaceCapitalized,
                { fontSize: 18 * SCALE, lineHeight: 18 * SCALE * 1.45 },
              ]}
            >
              India’s 1
            </Text>
            <Text
              style={[
                styles.marketplaceOrdinal,
                { fontSize: 11.61 * SCALE, lineHeight: 18 * SCALE * 1.45 },
              ]}
            >
              st
            </Text>
            <Text
              style={[
                styles.marketplaceCapitalized,
                { fontSize: 18 * SCALE, lineHeight: 18 * SCALE * 1.45 },
              ]}
            >
              {' '}
              electrical marketplace
            </Text>
          </Text>
        </View>

        <LinearGradient
          colors={[
            'rgba(217, 35, 45, 0)',
            '#FF666E',
            'rgba(217, 35, 45, 0)',
          ]}
          locations={[0, 0.49519, 1]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={[
            styles.banner,
            {
              width: SCREEN_W,
              paddingVertical: 19 * SCALE,
              paddingHorizontal: 10 * SCALE,
              /* Figma: ~40pt between marketplace block and banner (215 − 175) */
              marginTop: 40 * SCALE,
            },
          ]}
        >
          <Text
            style={[
              styles.bannerTitle,
              {
                fontSize: 20 * SCALE,
                lineHeight: 20 * SCALE * 1.45,
              },
            ]}
          >
            Technician Partner App
          </Text>
        </LinearGradient>

        <View
          style={[
            styles.heroSection,
            { marginTop: 12 * SCALE, paddingBottom: 40 * SCALE },
          ]}
        >
          <View style={[styles.heroFrame, { width: heroW, aspectRatio: heroAspect }]}>
            <Image
              accessibilityLabel="Delivery partner on scooter"
              source={require('../../assets/splash-hero.png')}
              style={styles.heroImage}
              resizeMode="cover"
            />
            <Image
              accessible={false}
              source={require('../../assets/splash-badge.png')}
              style={[
                styles.badge,
                {
                  width: badgeSize,
                  height: badgeSize,
                  borderRadius: badgeSize / 2,
                  top: `${(BADGE_TOP_D / HERO_H_D) * 100}%`,
                  left: `${(BADGE_LEFT_D / HERO_W_D) * 100}%`,
                },
              ]}
              resizeMode="cover"
            />
          </View>
        </View>
      </View>

      <View
        style={[styles.footerLayer, { paddingBottom: Math.max(20, ScreenBottomSafe()) }]}
        pointerEvents="none"
      >
        <Text
          style={[
            styles.companyLine,
            {
              fontSize: Math.max(12, 16 * SCALE),
            },
          ]}
        >
          By Linevolt Innovations India Pvt. Ltd.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#D9232D',
    overflow: 'hidden',
  },
  ellipseLayer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
    elevation: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  mainColumn: {
    flex: 1,
    zIndex: 1,
    elevation: 4,
    alignItems: 'center',
  },
  brandBlock: {
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 16,
  },
  logoTitleBlock: {
    alignItems: 'center',
  },
  logoIconWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  ellipseWrap: {
    alignItems: 'center',
    opacity: 0.98,
  },
  title: {
    fontFamily: 'Rubik_400Regular',
    color: '#FFFFFF',
    letterSpacing: -0.0784,
    ...(Platform.OS === 'android' && {
      fontVariant: undefined,
      includeFontPadding: false,
    }),
  },
  subtitle: {
    fontFamily: 'Rubik_400Regular',
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
  marketplace: {
    textAlign: 'center',
    maxWidth: 288,
  },
  marketplaceCapitalized: {
    fontFamily: 'PublicSans_400Regular',
    color: '#FFFFFF',
    textTransform: 'capitalize',
  },
  marketplaceOrdinal: {
    fontFamily: 'PublicSans_400Regular',
    color: '#FFFFFF',
  },
  banner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerTitle: {
    fontFamily: 'PublicSans_600SemiBold',
    color: '#FFFFFF',
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  heroSection: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  heroFrame: {
    position: 'relative',
    maxWidth: '100%',
  },
  heroImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  badge: {
    position: 'absolute',
    transform: [{ rotate: '-1.35deg' }],
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 1.4,
      },
      android: { elevation: 3 },
      default: {},
    }),
  },
  footerLayer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2,
    elevation: 6,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  companyLine: {
    fontFamily: 'PublicSans_500Medium',
    color: '#FFFFFF',
    textAlign: 'center',
    paddingHorizontal: 24,
    marginBottom: 4,
  },
});

function ScreenBottomSafe() {
  if (Platform.OS === 'android') return 28;
  return 34;
}
