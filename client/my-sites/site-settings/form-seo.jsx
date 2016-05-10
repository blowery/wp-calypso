/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import Card from 'components/card';
import Button from 'components/button';
import SectionHeader from 'components/section-header';
import ExternalLink from 'components/external-link';
import formBase from './form-base';
import protectForm from 'lib/mixins/protect-form';
import dirtyLinkedState from 'lib/mixins/dirty-linked-state';
import FormInput from 'components/forms/form-text-input-with-affixes';
import FormInputValidation from 'components/forms/form-input-validation';
import FormFieldset from 'components/forms/form-fieldset';
import FormLabel from 'components/forms/form-label';
import FormSettingExplanation from 'components/forms/form-setting-explanation';

export default React.createClass( {
	displayName: 'SiteSettingsFormSEO',

	mixins: [ dirtyLinkedState, protectForm.mixin, formBase ],

	getSettingsFromSite( site ) {
		site = site || this.props.site;

		const settings = {
			fetchingSettings: site.fetchingSettings
		};

		if ( site.settings ) {
			settings.blog_public = site.settings.blog_public;
		}

		if ( site.options ) {
			settings.seo_meta_description = site.options.seo_meta_description;
			settings.verification_services_codes = site.options.verification_services_codes;
		}

		return settings;
	},

	resetState() {
		this.replaceState( {
			blog_public: '',
			seo_description: '',
			seo_meta_description: '',
			verification_services_codes: [
				{ google: '' },
				{ bing: '' },
				{ pinterest: '' },
				{ yandex: '' }
			]
		} );
	},

	handleVerificationCodeChange( event ) {
		if ( ! event.target ) {
			return;
		}

		const { id, value } = event.target;
		const productId = id.replace( 'webmaster_tools_', '' );

		let verificationServicesCodes = this.state.verification_services_codes;
		if ( ! verificationServicesCodes.hasOwnProperty( productId ) ) {
			return;
		}

		verificationServicesCodes[ productId ] = value;

		this.setState( { verification_services_codes: verificationServicesCodes } );
	},

	visibilityOptions() {
		const { site } = this.props;
		const { verification_services_codes } = this.state;
		const isMetaError = this.state.seo_meta_description.length > 160;
		const googleCode = verification_services_codes.google || '';
		const bingCode = verification_services_codes.bing || '';
		const pinterestCode = verification_services_codes.pinterest || '';
		const yandexCode = verification_services_codes.yandex || '';
		const sitemapUrl = `https://${ site.slug }/sitemap.xml`;

		return (
			<FormFieldset>
				<FormFieldset className="has-divider is-top-only">
					<FormLabel htmlFor="seo_meta_description">{ this.translate( 'Site Description' ) }</FormLabel>
					<FormInput
						name="seo_meta_description"
						type="text"
						id="seo_meta_description"
						valueLink={ this.linkState( 'seo_meta_description' ) }
						disabled={ this.state.fetchingSettings }
						isError={ isMetaError } />
					{ isMetaError &&
						<FormInputValidation isError={ true } text={ this.translate( 'Description can\'t be longer than 160 characters.' ) } />
					}
					<FormSettingExplanation>
						{ this.translate( 'Entice potential viewers with a description of your site in less than 160 characters. This description will show in search engine results.' ) }
					</FormSettingExplanation>
				</FormFieldset>

				<FormFieldset className="has-divider">
					<FormLabel htmlFor="seo_sitemap">{ this.translate( 'XML Sitemap' ) }</FormLabel>
					<ExternalLink icon={ true } href={ sitemapUrl }>{ sitemapUrl }</ExternalLink>
					<FormSettingExplanation>
						{ this.translate( 'Your site\'s sitemap is automatically sent to all major search engines for indexing.' ) }
					</FormSettingExplanation>
				</FormFieldset>

				<FormFieldset>
					<FormLabel htmlFor="webmaster_tools_google">{ this.translate( 'Website Verification Services' ) }</FormLabel>
					<FormSettingExplanation>
						{ this.translate( 'This is where we will explain what the deal is with these verification codes.' ) }
					</FormSettingExplanation>
					<FormInput
						prefix={ this.translate( 'Google' ) }
						name="webmaster_tools_google"
						type="text"
						value={ googleCode }
						id="webmaster_tools_google"
						disabled={ this.state.fetchingSettings }
						onChange={ this.handleVerificationCodeChange } />
				</FormFieldset>

				<FormFieldset>
					<FormInput
						prefix={ this.translate( 'Bing' ) }
						name="webmaster_tools_bing"
						type="text"
						value={ bingCode }
						id="webmaster_tools_bing"
						disabled={ this.state.fetchingSettings }
						onChange={ this.handleVerificationCodeChange } />
				</FormFieldset>

				<FormFieldset>
					<FormInput
						prefix={ this.translate( 'Pinterest' ) }
						name="webmaster_tools_pinterest"
						type="text"
						value={ pinterestCode }
						id="webmaster_tools_pinterest"
						disabled={ this.state.fetchingSettings }
						onChange={ this.handleVerificationCodeChange } />
				</FormFieldset>

				<FormFieldset>
					<FormInput
						prefix={ this.translate( 'Yandex' ) }
						name="webmaster_tools_yandex"
						type="text"
						value={ yandexCode }
						id="webmaster_tools_yandex"
						disabled={ this.state.fetchingSettings }
						onChange={ this.handleVerificationCodeChange } />
				</FormFieldset>

			</FormFieldset>
		);
	},

	render() {
		var site = this.props.site;

		return (
			<div className={ this.state.fetchingSettings ? 'is-loading' : '' }>
				<SectionHeader label={ this.translate( 'Search Engine Optimization' ) }>
					<Button
						compact={ true }
						onClick={ this.submitForm }
						primary={ true }

						type="submit"
						disabled={ this.state.fetchingSettings || this.state.submittingForm }>
							{ this.state.submittingForm
								? this.translate( 'Saving…' )
								: this.translate( 'Save Settings' )
							}
					</Button>
				</SectionHeader>
				<Card>
					<p>
						{ this.translate(
							'WordPress.com has great SEO out of the box - you don\'t have to do anything extra.' +
							' All of our themes are optimized for search engines, which means they are designed' +
							' to make it easy for Googlebot (and other search engines) to crawl through them and' +
							' discover the content. {{a}}Read more about what you can do to optimize your site\'s SEO.{{/a}}',
							{
								components: {
									a: <a href={ 'https://en.support.wordpress.com' } />
								}
							}
						) }
					</p>
					<form onChange={ this.markChanged } className="seo-form">
						{ this.visibilityOptions() }
					</form>
				</Card>
			</div>
		);
	}
} );
